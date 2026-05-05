import axios from "axios";
axios.defaults.withCredentials = true; 
const API_URL = '/api/transactions'

export const getTransactions = async () => {
    const res = await axios.get(API_URL);
    return res.data
}
export const createTransaction = async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data
}

export const deleteTransaction = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data
}
export const updateTransaction = async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data
};