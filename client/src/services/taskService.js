import axios from 'axios';

const API_BASE = 'https://6854c9506a6ef0ed66300b4d.mockapi.io/api/users';

const taskService = {
    getAll: (userId) => axios.get(`${API_BASE}/${userId}/tasks`),
    getByUserId: (userId) => axios.get(`${API_BASE}/${userId}/tasks`),
    add: (userId, task) => axios.post(`${API_BASE}/${userId}/tasks`, task),
    delete: (userId, taskId) => axios.delete(`${API_BASE}/${userId}/tasks/${taskId}`),
    update: (userId, taskId, updates) => axios.put(`${API_BASE}/${userId}/tasks/${taskId}`, updates),
};

export default taskService;
