const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
const { BlobServiceClient } = require('@azure/storage-blob');
const { SearchClient } = require('@azure/search-documents');

class ChatService {
  constructor() {
    if (!process.env.AZURE_OPENAI_ENDPOINT || !process.env.AZURE_OPENAI_KEY) {
      throw new Error('Azure OpenAI credentials are not configured');
    }

    try {
      console.log('Creating OpenAI client...');
      this.openAIClient = new OpenAIClient(
        process.env.AZURE_OPENAI_ENDPOINT,
        new AzureKeyCredential(process.env.AZURE_OPENAI_KEY)
      );
      console.log('OpenAI client created successfully');
    } catch (error) {
      console.error('Error creating OpenAI client:', error);
      throw error;
    }

    if (process.env.AZURE_SEARCH_ENDPOINT && process.env.AZURE_SEARCH_KEY) {
      this.searchClient = new SearchClient(
        process.env.AZURE_SEARCH_ENDPOINT,
        process.env.AZURE_SEARCH_INDEX_NAME,
        new AzureKeyCredential(process.env.AZURE_SEARCH_KEY)
      );
    }

    if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
      );
    }

    // Add system prompt configuration
    this.systemPrompt = process.env.SYSTEM_PROMPT || 'You are a helpful assistant.';
  }

  async generateResponse(message, context) {
    try {
      console.log('Generating response for message:', message);
      console.log('Using deployment:', process.env.AZURE_OPENAI_DEPLOYMENT);
      
      const response = await this.openAIClient.getChatCompletions(
        process.env.AZURE_OPENAI_DEPLOYMENT,
        [{
          role: 'system',
          content: this.systemPrompt
        }, {
          role: 'user',
          content: `${context}\n\nUser: ${message}`
        }]
      );

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error in generateResponse:', error);
      throw error;
    }
  }
}

module.exports = ChatService;
