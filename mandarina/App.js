import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import MainNavigator from "./navigation/AppNavigator";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
