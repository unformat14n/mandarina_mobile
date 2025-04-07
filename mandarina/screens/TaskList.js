import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import colors from "../styles/colors";
import { PieChart } from "react-native-chart-kit";
import { useTheme } from "../context/ThemeContext";
import { TaskListItem } from "../components/Task";
import { taskService } from "../services/api";
import { useUser } from "../context/UserContext";

function TaskList() {
    const { theme, palette } = useTheme();
    const styles = getStyles(theme, palette);
    const screenWidth = Dimensions.get("window").width;
    const { userId } = useUser();
    const [tasks, setTasks] = useState([]);

    const chartData = [
        {
            name: "Completed",
            population: 40,
            color: colors[palette].altSecondary || "#4CAF50",
            legendFontColor: colors[theme].text,
            legendFontSize: 15,
        },
        {
            name: "Pending",
            population: 30,
            color: colors[palette].altPrimary || "#FF9800",
            legendFontColor: colors[theme].text,
            legendFontSize: 15,
        },
        {
            name: "In Progress",
            population: 30,
            color: colors[palette].primary,
            legendFontColor: colors[theme].text,
            legendFontSize: 15,
        },
    ];

    const chartConfig = {
        backgroundGradientFrom: colors[theme].background,
        backgroundGradientTo: colors[theme].background,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.2,
        useShadowColorFromDataset: false,
    };

    useEffect(() => {
        const getTasksInMonth = async () => {
            try {
                const response = await taskService.getTasks(userId);

                if (response.success) {
                    setTasks(response.tasks);
                } else {
                    console.error("Error fetching tasks:", response.message);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        getTasksInMonth();
    }, [userId, tasks]);

    const renderTasks = () => {
        if (tasks.length === 0) {
            return <Text style={styles.taskHeaders}>No tasks found c:</Text>;
        }
        return tasks.map((task) => (
            <TaskListItem
                key={task.id}
                id={task.id}
                title={task.title}
                date={task.dueDate}
                hour={`${task.hour}:${String(task.minute).padStart(2, "0")}`}
                priority={task.priority}
                status={task.status}
                description={task.description}
            />
        ));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tasks</Text>
            <Text style={styles.chartHdr}>Tasks Completion Status</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={chartData}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 10]}
                    absolute // Shows values instead of percentages if false
                    hideLegend={true} // Hide the default legend
                    style={styles.chart}
                />
            </View>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.taskContainer}>
                    <Text style={styles.taskHeaders}>Your Recent Tasks:</Text>
                    {renderTasks()}
                </View>
            </ScrollView>
        </View>
    );
}

// Keep the same styles as before
const getStyles = (theme, palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            backgroundColor: colors[palette].background,
            paddingHorizontal: 20,
            height: "100%",
        },
        header: {
            marginTop: 20,
            marginLeft: 20,
            fontSize: 64,
            fontWeight: "bold",
            color: colors[palette].primary,
        },
        chartHdr: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors[palette].altSecondary,
            textAlign: "center",
            marginBottom: 10,
            marginTop: 10,
        },
        chartContainer: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            width: "100%",
            backgroundColor: colors[theme].secondaryBg,
            padding: 16,
            marginBottom: 20,
        },
        chart: {
            borderRadius: 16,
            marginVertical: 8,
        },
        legendContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 16,
        },
        legendItem: {
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 8,
            marginVertical: 4,
        },
        legendColor: {
            width: 16,
            height: 16,
            borderRadius: 8,
            marginRight: 8,
        },
        legendText: {
            fontSize: 14,
            color: colors[palette].text,
        },
        scrollContainer: {
            flex: 1,
            margin: "auto",
            width: "100%",
            height: "100%",
        },
        taskContainer: {
            flexDirection: "column",
            backgroundColor: colors[theme].secondaryBg,
            borderRadius: 16,
            padding: 16,
        },
        taskHeaders: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors[palette].altSecondary,
            textAlign: "center",
            marginBottom: 10,
        },
    });

export default TaskList;
