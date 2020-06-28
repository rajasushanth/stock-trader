import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Context-type": "application/json"
  }
});

export default httpClient;