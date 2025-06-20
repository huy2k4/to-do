import axios from 'axios';

const API_BASE = 'https://6854c9506a6ef0ed66300b4d.mockapi.io/api/tasks';

export const fetchTasksApi = () => axios.get(API_BASE);
export const addTaskApi = (task) => axios.post(API_BASE, task);
export const deleteTaskApi = (id) => axios.delete(`${API_BASE}/${String(id)}`);
export const updateTaskApi = (id, updates) => axios.put(`${API_BASE}/${id}`, updates);
