import api from './api'
const API_URL = '/api/transactions';


export const getTransactions = async () => {
    const res = await api.get(API_URL);
    return res.data
}
export const createTransaction = async (data) => {
    const res = await api.post(API_URL, data);
    return res.data
}

export const deleteTransaction = async (id) => {
    const res = await api.delete(`${API_URL}/${id}`);
    return res.data
}
export const updateTransaction = async (id, data) => {
    const res = await api.put(`${API_URL}/${id}`, data);
    return res.data
};