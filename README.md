# Azure OpenAI Chatbot

A full-stack chatbot application built with React, Node.js, and Azure OpenAI services.

## Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm (Node Package Manager)
- An Azure account with OpenAI services enabled
- Azure OpenAI API credentials:
  - AZURE_OPENAI_ENDPOINT
  - AZURE_OPENAI_KEY
  - AZURE_OPENAI_DEPLOYMENT

## Project Structure 

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-azure-chatbot
   ```

2. **Environment Variables**
   
   Create a `.env` file in the server directory:
   ```
   AZURE_OPENAI_ENDPOINT=your_endpoint_here
   AZURE_OPENAI_KEY=your_key_here
   AZURE_OPENAI_DEPLOYMENT=your_deployment_name_here
   ```

3. **Install Dependencies**
   
   From the root directory:
   ```bash
   npm run install-all
   ```
   This will install dependencies for both client and server.

4. **Start the Development Server**

   From the root directory:
   ```bash
   npm run dev
   ```
   This will start both the frontend and backend servers:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Available Scripts

- `npm run dev`: Starts both frontend and backend in development mode
- `npm run client`: Starts only the frontend
- `npm run server`: Starts only the backend
- `npm run install-all`: Installs dependencies for all parts of the application

## API Endpoints

### Chat Endpoint
- **POST** `/api/chat`
  - Sends messages to Azure OpenAI
  - Request body: `{ "message": "Your message here" }`
  - Returns: `{ "response": "AI response here" }`

## Technologies Used

- **Frontend**:
  - React
  - CSS for styling
  - Axios for API calls

- **Backend**:
  - Node.js
  - Express
  - Azure OpenAI SDK
  - CORS
  - dotenv for environment variables

## Troubleshooting

1. If you see `AzureKeyCredential is not a constructor` error:
   - Ensure you have the correct version of `@azure/openai` installed
   - Check if your `.env` file is properly configured

2. If the frontend can't connect to the backend:
   - Verify that both servers are running
   - Check if the proxy in client's package.json is correctly set
   - Ensure CORS is properly configured in the backend

## Security Notes

- Never commit your `.env` file
- Ensure rate limiting is implemented for production use
- Use appropriate security headers in production
- Keep all dependencies updated

## License

ISC 