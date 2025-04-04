import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import MainNavigator from "./navigation/AppNavigator";
import { ThemeProvider } from "./context/ThemeContext";
import axios from "axios"; // Import axios for making HTTP requests

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const testConnection = async () => {
        try {
            const response = await axios.get("http://3.92.229.188:4000/hello");
            console.log("Server response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Connection error:", error.message);
            throw error;
        }
    };

    // Call this somewhere in your app (like useEffect in App.js)
    useEffect(() => {
        testConnection().catch(console.error);
    }, []);

    return (
        <ThemeProvider>
            <NavigationContainer>
                {isLoggedIn ? (
                    <MainNavigator />
                ) : (
                    <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
                )}
            </NavigationContainer>
        </ThemeProvider>
    );
}
