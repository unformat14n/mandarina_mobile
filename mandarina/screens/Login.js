import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import colors from "../styles/colors";
import { useTheme } from "../context/ThemeContext";

const Login = ({ setIsLoggedIn }) => {
    const { theme, palette } = useTheme();
    const styles = getStyles(theme, palette);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Logging in with:", email, password);
        // Here, you would add authentication logic.

        setIsLoggedIn(true);
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const getStyles = (curTheme, palette) => StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: colors[palette].secondary },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: colors[curTheme].background
    },
    text: {
        color: colors[curTheme].text,
        fontSize: 16,
        marginBottom: 10,
    },
    button: { backgroundColor: colors[palette].primary, padding: 10, borderRadius: 7 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    link: { marginTop: 10, color: colors[curTheme].secondary },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});

export default Login;
