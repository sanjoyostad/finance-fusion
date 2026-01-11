import axios from 'axios';

// This points to your running Python server
const API_URL = 'http://127.0.0.1:8000/transactions';

export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(API_URL, transactionData);
    return response.data;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
};