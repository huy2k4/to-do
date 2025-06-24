import axios from 'axios';

const API_URL = 'https://6854c9506a6ef0ed66300b4d.mockapi.io/api/users';

const userService = {
    getAll: () => axios.get(API_URL),
    getById: (id) => axios.get(`${API_URL}/${id}`),
    create: (data) => axios.post(API_URL, data),
    update: (id, data) => axios.put(`${API_URL}/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/${id}`),
    login: async (username, password) => {
        const res = await axios.get(API_URL);
        return res.data.find(u => u.username === username && u.password === password);
    }
};

export default userService;
