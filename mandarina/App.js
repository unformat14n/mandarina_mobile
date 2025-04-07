import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import MainNavigator from "./navigation/AppNavigator";
import { ThemeProvider } from "./context/ThemeContext";
import axios from "axios"; // Import axios for making HTTP requests
import UserProvider from "./context/UserContext";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserProvider>
            <ThemeProvider>
                <NavigationContainer>
                    {isLoggedIn ? (
                        <MainNavigator />
                    ) : (
                        <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
                    )}
                </NavigationContainer>
            </ThemeProvider>
        </UserProvider>
    );
}
