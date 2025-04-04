import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Calendar from "./Calendar";
import SettingsTab from "./SettingsTab";
import Dashboard from "./Dashboard";
import TaskList from "./TaskList";
import colors from "../styles/colors";
import { useTheme } from "../context/ThemeContext";

function Home() {
    const { theme, palette } = useTheme();
    const [state, setState] = useState("calendar");
    const styles = getStyles(theme, palette);

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
                {state === "tasks" && <TaskList />}
                {state === "dashboard" && <Dashboard />}
                {state === "settings" && <SettingsTab />}
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

const getStyles = (curTheme, palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: colors[curTheme].background,
            marginTop: 40,
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
            backgroundColor: colors[curTheme].background,
            // position: "absolute",
            boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
        },
        navBtn: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            borderColor: colors[curTheme].secondaryTxt,
            borderWidth: 1,
            width: "auto",
            height: "auto",
            marginInline: 5,
            padding: 10,
        },
        activeNavBtn: {
            backgroundColor: colors[palette].primary, // Add active button style
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            borderColor: colors[palette].primary,
            borderWidth: 1,
            width: "auto",
            height: "auto",
            marginInline: 5,
            padding: 10,
        },
        navTxt: {
            color: colors[curTheme].secondaryTxt,
            fontSize: 16,
            fontWeight: "bold",
        },
        activeNavTxt: {
            color: "#fff", // Add active text style
            fontSize: 16,
            fontWeight: "bold",
        },
    });

export default Home;
