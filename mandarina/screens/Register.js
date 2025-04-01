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

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        console.log("Registering with:", email, password);
        // Here, you would add registration logic.
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.title}>Register</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: colors.secondary  },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: { backgroundColor: colors.primary, padding: 10, borderRadius: 5 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    link: { marginTop: 10, color: "blue", color: colors.secondary },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});

export default Register;
