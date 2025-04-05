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
    ActivityIndicator,
} from "react-native";
import { authService } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../styles/colors";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme, palette } = useTheme();
    const { setUserId, isLoading: userLoading } = useUser();
    const styles = getStyles(theme, palette);

    const handleLogin = async () => {
        setLoading(true);

        try {
            const response = await authService.login(email, password);

            if (response.success) {
                // Store token and user ID
                await AsyncStorage.multiSet([
                    ["@userToken", response.token],
                    ["@userId", response.id.toString()],
                ]);

                // Update user context
                setUserId(response.id.toString());

                // Navigate to main app screen
                setIsLoggedIn(true);
            } else {
                Alert.alert(
                    "Login Failed",
                    response.message || "Unknown error"
                );
            }
        } catch (error) {
            console.error("Login error:", error);
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

    // Show loading indicator while user context is initializing
    if (userLoading) {
        return (
            <View style={[styles.container, { justifyContent: "center" }]}>
                <ActivityIndicator
                    size="large"
                    color={colors[palette].primary}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Welcome to Mandarina!</Text>
            <Text style={styles.text}>
                Glad to have you here! Please enter your information:
            </Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor={colors[theme].textSecondary}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
            />

            <TextInput
                placeholder="Password"
                placeholderTextColor={colors[theme].textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                autoComplete="password"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}>
                {loading ? (
                    <ActivityIndicator color={colors[theme].background} />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
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
            backgroundColor: colors[theme].background,
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
            borderColor: colors[theme].secondaryBg,
            borderWidth: 1,
            marginBottom: 15,
            padding: 15,
            borderRadius: 8,
            backgroundColor: colors[theme].bg,
            color: colors[theme].text,
        },
        text: {
            marginBottom: 20,
            color: colors[theme].text,
            textAlign: "center",
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
            width: "100%",
            alignItems: "center",
            marginTop: 20,
            opacity: 1,
        },
        buttonDisabled: {
            opacity: 0.6,
        },
        buttonText: {
            color: colors[theme].background,
            fontWeight: "bold",
            fontSize: 16,
        },
        logo: {
            width: 150,
            height: 150,
            marginBottom: 20,
            marginTop: 40,
        },
    });

export default Login;
