import axios from 'axios';

// 1. Point to your Python Backend
const API_URL = 'http://127.0.0.1:8000/transactions';

// 2. Fetch all transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// 3. Save a new transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(API_URL, transactionData);
    return response.data;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
};