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

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Logging in with:", email, password);
        // Here, you would add authentication logic.
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

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: colors.secondary },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: colors.background
    },
    text: {
        color: colors.text,
        fontSize: 16,
        marginBottom: 10,
    },
    button: { backgroundColor: colors.primary, padding: 10, borderRadius: 7 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    link: { marginTop: 10, color: colors.secondary },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});

export default Login;
