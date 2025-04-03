import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const ThemeContext = createContext();

// Custom hook for easy access
export const useTheme = () => useContext(ThemeContext);

// Context Provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const [palette, setPalette] = useState("mandarina");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem("theme");
            if (savedTheme) {
                setTheme(savedTheme);
            }
        };
        loadTheme();
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, palette, setPalette }}>
            {children}
        </ThemeContext.Provider>
    );
};
