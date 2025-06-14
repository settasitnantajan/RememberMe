import axios from 'axios';
import { Platform, Alert } from 'react-native';


const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: `${BASE_URL}/todos`,
  timeout: 10000,
});
apiClient.interceptors.request.use(
  config => {

    console.log('Starting Request:', {
      method: config.method?.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      data: config.data,
      params: config.params,
      headers: config.headers,
    });
    return config;
  },
  error => {
    console.error('Request Error Interceptor:', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    console.log('Response Received:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;

  },
  error => {
    console.error("API Response Error Interceptor:", {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      responseData: error.response?.data,
      requestData: error.config?.data,
    });

    if (error.message === 'Network Error' && !error.response) {
        Alert.alert(
            "Network Error",
            "Could not connect to the server. Please check your internet connection and ensure the server is running."
        );
    } else if (error.response) {
        Alert.alert(
            `Error ${error.response.status}`,
            error.response.data?.error || "An unexpected error occurred."
        );
    } else {
        Alert.alert("Error", "An unexpected error occurred while making the request.");
    }
    return Promise.reject(error);
  },
);


export const fetchTodosAPI = async () => {
  const response = await apiClient.get('/');
  return response.data;
};

export const addTodoAPI = async (text) => {
  const response = await apiClient.post('/', { text });
  return response.data;
};

export const toggleTodoAPI = async (id, completed) => {
  const response = await apiClient.put(`/${id}`, { completed });
  return response.data;
};

export const deleteTodoAPI = async (id) => {
  await apiClient.delete(`/${id}`);
  return id;
};

export const editTodoTextAPI = async (id, newText) => {
  const response = await apiClient.put(`/${id}/text`, { text: newText });
  return response.data;
};
