// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.yourservice.com', // replace with your actual API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
