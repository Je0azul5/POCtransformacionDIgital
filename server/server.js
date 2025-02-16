require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Add this to check if env variables are loaded
console.log('Environment variables check:', {
  AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT ? 'Set ✅' : 'Not set ❌',
  AZURE_OPENAI_KEY: process.env.AZURE_OPENAI_KEY ? 'Set ✅' : 'Not set ❌',
  AZURE_OPENAI_DEPLOYMENT: process.env.AZURE_OPENAI_DEPLOYMENT ? 'Set ✅' : 'Not set ❌',
  AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING ? 'Set ✅' : 'Not set ❌'
});

// Security middleware
app.use(helmet());
// Update CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'your-production-domain' 
    : 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());

// Routes
app.use('/api/chat', require('./routes/chat'));

// Add a basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Add this after your other routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
const { BlobServiceClient } = require('@azure/storage-blob');
const { SearchClient, AzureKeyCredential: SearchCredential } = require('@azure/search-documents');

console.log('Environment check:', {
  hasOpenAIEndpoint: !!process.env.AZURE_OPENAI_ENDPOINT,
  hasOpenAIKey: !!process.env.AZURE_OPENAI_KEY,
  hasOpenAIDeployment: !!process.env.AZURE_OPENAI_DEPLOYMENT,
});

class ChatService {
  constructor() {
    this.openAIClient = new OpenAIClient(
      process.env.AZURE_OPENAI_ENDPOINT,
      new AzureKeyCredential(process.env.AZURE_OPENAI_KEY)
    );

    this.searchClient = new SearchClient(
      process.env.AZURE_SEARCH_ENDPOINT,
      process.env.AZURE_SEARCH_INDEX_NAME,
      new SearchCredential(process.env.AZURE_SEARCH_KEY)
    );

    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING
    );
  }

  async generateResponse(message, context) {
    try {
      // Search for relevant context
      const searchResults = await this.searchClient.search(message, {
        top: 3,
        select: ['content']
      });

      // Prepare conversation context
      const conversationContext = [
        ...searchResults.results.map(result => result.document.content),
        context
      ].join('\n');

      // Generate response using Azure OpenAI
      const response = await this.openAIClient.getChatCompletions(
        process.env.AZURE_OPENAI_DEPLOYMENT,
        [{
          role: 'system',
          content: 'You are a helpful assistant.'
        }, {
          role: 'user',
          content: `${conversationContext}\n\nUser: ${message}`
        }]
      );

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }

  async saveConversation(conversation) {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(
        process.env.AZURE_STORAGE_CONTAINER_NAME
      );
      
      const blobName = `conversation-${Date.now()}.json`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      
      await blockBlobClient.upload(
        JSON.stringify(conversation),
        JSON.stringify(conversation).length
      );
    } catch (error) {
      console.error('Error saving conversation:', error);
      throw error;
    }
  }
}

module.exports = new ChatService();
