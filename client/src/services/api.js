import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';
const errorHandler = require('./middleware/errorHandler');

export const chatAPI = {
  testConnection: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/test-connection`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendMessage: async (message, context) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message,
        context
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
app.use(errorHandler);
export default chatAPI;