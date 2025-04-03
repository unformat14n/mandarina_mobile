import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import colors from "../styles/colors";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
    const { theme, palette } = useTheme();
    const styles = getStyles(theme, palette);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dashboard</Text>
            <View style={styles.largeCard}>
                <View>
                    <Text style={styles.taskNumber}>25</Text>
                </View>
                <View style={styles.completedInfo}>
                    <Text style={styles.altText}>You have completed</Text>
                    <Text style={styles.whiteTxt}>Tasks during this month</Text>
                </View>
            </View>
            <View style={{ height: 200, padding: 20 }}>
            </View>
        </View>
    );
}

const getStyles = (theme, palette) =>
    StyleSheet.create({
        container: {
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: colors[theme].background,
        },
        header: {
            marginTop: 20,
            marginLeft: 20,
            fontSize: 30,
            fontWeight: "bold",
            color: colors[palette].primary,
            textAlign: "center",
        },
        largeCard: {
            width: "90%",
            margin: 20,
            padding: 20,
            backgroundColor: colors[palette].secondary,
            borderRadius: 20,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        taskNumber: {
            fontSize: 128,
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
        },
        completedInfo: {
            flexDirection: "column",
            // justifyContent: "flex-start",
            alignItems: "flex-start",
            flexWrap: "wrap",
            marginLeft: 40,
        },
        altText: {
            marginBlock: "auto",
            fontSize: 24,
            color: "#ffffff",
        },
        whiteTxt: {
            color: "#ffffff",
        },
    });

export default Dashboard;
