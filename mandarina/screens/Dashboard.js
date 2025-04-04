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
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
    const { theme, palette } = useTheme();
    const styles = getStyles(theme, palette);

    const screenWidth = Dimensions.get("window").width;

    const chartData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [3, 4, 6, 8, 5, 7, 2],
                color: () => colors[palette].primary,
                strokeColor: colors[palette].primary,
                fillColor: colors[palette].primary,
                fillGradientColor: colors[palette].primary,
                fillGradientFromOpacity: 0.5,
                fillGradientToOpacity: 0.5,
                strokeWidth: 2,
            },
        ],
        legend: ["Productivity"], // optional
    };

    const chartConfig = {
        backgroundColor: colors[theme].background,
        backgroundGradientFrom: colors[theme].background,
        backgroundGradientTo: colors[theme].background,
        decimalPlaces: 0,
        color: () => `${colors[theme].text}2a`,
        labelColor: () => `${colors[theme].text}`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: colors[palette].primary,
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dashboard</Text>
            <LinearGradient
                colors={[
                    colors[palette].secondary,
                    colors[palette].altSecondary,
                ]}
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                style={styles.largeCard}>
                <View>
                    <Text style={styles.taskNumber}>25</Text>
                </View>
                <View style={styles.completedInfo}>
                    <Text style={styles.altText}>You have completed</Text>
                    <Text style={styles.whiteTxt}>Tasks during this month</Text>
                </View>
            </LinearGradient>
            <View style={styles.chartContainer}>
                <LineChart
                    data={chartData}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                />
            </View>
            <View style={styles.splitGrid}>
                <LinearGradient
                    colors={[
                        colors[palette].primary,
                        colors[palette].altPrimary,
                    ]}
                    style={styles.card}>
                    <Text style={styles.cardText}>Pending Tasks</Text>
                    <Text style={styles.taskNumber}>6</Text>
                </LinearGradient>
                <LinearGradient
                    colors={[
                        colors[palette].primary,
                        colors[palette].altPrimary,
                    ]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.card}>
                    <Text style={styles.cardText}>In Progress</Text>
                    <Text style={styles.taskNumber}>14</Text>
                </LinearGradient>
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
            fontSize: 64,
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
        chartContainer: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            width: "100%",
            backgroundColor: colors[theme].secondaryBg,
            padding: 8,
        },
        chart: {
            borderRadius: 16,
        },
        splitGrid: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
        },
        card: {
            width: "40%",
            margin: 20,
            padding: 20,
            borderRadius: 20,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        cardText: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
        },
    });

export default Dashboard;
