const express = require('express');
const router = express.Router();
const ChatService = require('../services/chatService');

const chatService = new ChatService();

// Test Azure connections
router.get('/test-connection', async (req, res) => {
  try {
    // Test OpenAI
    const openAITest = await chatService.generateResponse('Hello, are you there?', '');

    res.json({
      status: 'success',
      message: 'Azure OpenAI service connected successfully',
      response: openAITest
    });

  } catch (error) {
    console.error('Connection test failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Connection test failed',
      error: error.message
    });
  }
});

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    console.log('Received chat request:', req.body);
    const { message, context } = req.body;
    
    if (!message) {
      console.log('Missing message in request');
      return res.status(400).json({
        status: 'error',
        message: 'Message is required'
      });
    }

    console.log('Generating response with OpenAI...');
    const response = await chatService.generateResponse(message, context);
    console.log('OpenAI response:', response);
    
    res.json({
      status: 'success',
      message: response
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
});

module.exports = router; 