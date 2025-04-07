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

export const taskService = {
    getTasks: async (userId) => {
        try {
            const response = await api.post("/get-tasks", { userId });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch tasks" };
        }
    },

    createTask: async (taskData) => {
        try {
            const response = await api.post("/create-task", taskData);
            return response.data;
        } catch (error) {
            console.log(error.response?.data)
            throw error.response?.data || { message: "Failed to create task" };
        }
    },

    updateTask: async (taskData) => {
        try {
            const response = await api.post("/update-task", taskData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to update task" };
        }
    },

    updateTaskStatus: async (taskId, status) => {
        try {
            const response = await api.post("/update-status", {
                taskId,
                status,
            });
            return response.data;
        } catch (error) {
            throw (
                error.response?.data || { message: "Failed to update status" }
            );
        }
    },

    deleteTask: async (taskId) => {
        try {
            const response = await api.post("/delete-task", { taskId });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to delete task" };
        }
    },
};

export const userService = {
    getUser: async (userId) => {
        try {
            const response = await api.post("/request-user", { userId });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch user" };
        }
    },
};
