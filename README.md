# Azure OpenAI Chatbot (LeticIA)

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
   - Backend: http://localhost:3001

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

# Project Context

**POC**  
Cultural Submanagement, National Library System

## Problem Description

The Cultural Submanagement currently faces significant challenges in distributing literary works to various cultural centers nationwide. The process relies heavily on the experience of the staff to prioritize shipments and decide where the literary works might generate the greatest added value. However, this approach presents several issues:

- **Manual Prioritization:** Distribution decisions are made based on personal experience rather than structured, data-driven analysis.
- **Manual Record Keeping:** The process of recording distributions is carried out manually, leading to repetitive operational tasks, high time consumption, and an increased risk of errors.
- **Lack of Data-Driven Insight:** Without a systematic analysis of historical data and regional demand, it becomes difficult to optimize the allocation process and track its effectiveness.

## Role of Cognitive AI in the Solution

This Proof-of-Concept (POC) leverages cognitive AI to transform the traditional approach into a more efficient, data-driven process by focusing on two key areas:

1. **Optimization of Distribution:**
   - **Historical Data Analysis:** Machine learning algorithms analyze previous distribution records to identify patterns and trends.
   - **Regional Demand Prediction:** The system evaluates regional demand, taking into account cultural preferences and demographic factors, to predict which literary works will be most valued, enabling more efficient allocation.

2. **Automation of Record Keeping and Analysis:**
   - **OCR for Digitization:** Optical Character Recognition (OCR) is used to digitize manual records, converting them into structured data.
   - **NLP for Information Extraction:** Natural Language Processing (NLP) extracts and categorizes relevant information from the digitized records, reducing manual workload and improving process traceability.

## Required Input Data for the AI

To optimize the distribution process and automate record keeping, the AI system requires the following inputs:

- **Historical Distribution Data:** Detailed records of previous shipments including dates, quantities, and types of literary works sent to each cultural center.
- **Demand and Cultural Preferences:** Data on the most requested literary works per region, collected through surveys, attendance at literary events, and audience feedback.
- **Characteristics of Cultural Centers:** Information on each center's location, capacity, visitor demographics, types of activities, and frequency of material renewal.
- **Sociodemographic Information:** Regional statistics such as population data, education levels, library accessibility, and reading habits.
- **Current Manual Records:** Existing documents or databases maintained manually, which can be digitized using OCR.
- **External Factors:** Trends in literature, scheduled cultural events, and the availability of new works that could influence regional demand.

---

This POC illustrates how integrating cognitive AI can transform traditional processes by converting an experience-based approach into a system driven by data and automation. The solution not only optimizes the allocation of literary works but also streamlines record keeping and analysis, reducing manual effort and minimizing errors while ensuring that distribution decisions are aligned with current cultural and regional demands.
