// src/services/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Changed from localStorage

const API_BASE_URL = "http://3.92.229.188:4000";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Updated interceptor to use AsyncStorage
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("userToken"); // Changed to AsyncStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });

            // Store token using AsyncStorage
            if (response.data.token) {
                await AsyncStorage.setItem("userToken", response.data.token);
                await AsyncStorage.setItem("userId", String(response.data.id));
            }

            return response.data;
        } catch (error) {
            // console.error("Login error details:", {
            //     config: error.config,
            //     response: error.response,
            //     message: error.message,
            // });
            throw (
                error.response?.data || {
                    message: error.message || "Login failed",
                }
            );
        }
    },
    // ... other methods
};
