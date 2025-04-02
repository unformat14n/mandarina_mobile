import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Calendar from "./Calendar";
import colors from "../styles/colors";

function Home() {
    const [state, setState] = useState("calendar");

    const getNavButtonStyle = (navState) => {
        return state === navState ? styles.activeNavBtn : styles.navBtn;
    };

    const getNavTextStyle = (navState) => {
        return state === navState ? styles.activeNavTxt : styles.navTxt;
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {state === "calendar" && <Calendar />}
                {state === "tasks" && (
                    <View>
                        <Text>Tasks info should be here :)</Text>
                    </View>
                )}
                {state === "dashboard" && (
                    <View>
                        <Text>Dashboard should be here :)</Text>
                    </View>
                )}
                {state === "settings" && (
                    <View>
                        <Text>Settings should go here :)</Text>
                    </View>
                )}
            </View>
            <View style={styles.navBar}>
                <TouchableOpacity
                    style={getNavButtonStyle("calendar")}
                    onPress={() => setState("calendar")}>
                    <Text style={getNavTextStyle("calendar")}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={getNavButtonStyle("tasks")}
                    onPress={() => setState("tasks")}>
                    <Text style={getNavTextStyle("tasks")}>Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={getNavButtonStyle("dashboard")}
                    onPress={() => setState("dashboard")}>
                    <Text style={getNavTextStyle("dashboard")}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={getNavButtonStyle("settings")}
                    onPress={() => setState("settings")}>
                    <Text style={getNavTextStyle("settings")}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        flexDirection: "column",
    },
    navBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 50,
        backgroundColor: colors.background,
        // position: "absolute",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
    },
    navBtn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderColor: colors.secondaryBg,
        borderWidth: 1,
        width: "auto",
        height: "auto",
        marginInline: 5, 
        padding: 10,
    },
    activeNavBtn: {
        backgroundColor: colors.primary,  // Add active button style
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderColor: colors.primary,
        borderWidth: 1,
        width: "auto",
        height: "auto",
        marginInline: 5, 
        padding: 10,
    },
    navTxt: {
        color: colors.secondaryBg,
        fontSize: 16,
        fontWeight: "bold",
    },
    activeNavTxt: {
        color: "#fff",  // Add active text style
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Home;
