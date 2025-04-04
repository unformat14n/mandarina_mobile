// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Text,
    Image,
} from "react-native";
import { authService } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../styles/colors";
import { useTheme } from "../context/ThemeContext";

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("test@example.com"); // Pre-fill for testing
    const [password, setPassword] = useState("password123"); // Pre-fill for testing
    const [loading, setLoading] = useState(false);
    const { theme, palette } = useTheme();
    const styles = getStyles(theme, palette);

    const handleLogin = async () => {
        setLoading(true);

        try {
            const response = await authService.login(email, password);
            console.log("Login response:", response);

            if (response.success) {
                await AsyncStorage.setItem("userToken", response.token);
                await AsyncStorage.setItem("userId", response.id.toString());
                setIsLoggedIn(true);
            } else {
                Alert.alert(
                    "Login Failed",
                    response.message || "Unknown error"
                );
            }
        } catch (error) {
            // console.error("Login error:", error);
            Alert.alert(
                "Login Error",
                error.response?.data?.message ||
                    error.message ||
                    "Failed to connect to server"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Welcome to Mandarina!</Text>
            <Text style={styles.text}>Glad to have you here! Please enter your information:</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? "Loading..." : "Login"}
                </Text>
            </TouchableOpacity>
            <Text style={styles.link}>
                Don't have an account? Try the Register bottom tab!
            </Text>
        </View>
    );
};

const getStyles = (theme, palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            padding: 20,
            alignItems: "center",
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
            color: colors[palette].primary,
        },
        input: {
            width: "100%",
            height: 50,
            borderColor: colors[theme].text,
            borderWidth: 1,
            marginBottom: 15,
            padding: 15,
            borderRadius: 8,
            backgroundColor: colors[theme].background,
        },
        text: {
            marginBlock: 5,
            color: colors[theme].text,
        },
        link: {
            marginTop: 20,
            color: colors[palette].secondary,
            textAlign: "center",
            textDecorationLine: "underline",
        },
        button: {
            backgroundColor: colors[palette].primary,
            padding: 15,
            borderRadius: 8,
            width: "50%",
            alignItems: "center",
            marginTop: 20,
        },
        buttonText: {
            color: colors[theme].background,
            fontWeight: "bold",
        },
        logo: {
            width: 150,
            height: 150,
            marginBottom: 20,
        },
    });

export default Login;
