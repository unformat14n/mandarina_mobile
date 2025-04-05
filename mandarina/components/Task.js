import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../styles/colors";

function Task({ id, title, status, priority, date, hour }) {
    let priorityStyle =
        priority === "High" ? "lowp" : priority === "Medium" ? "medp" : "highp";
    const styles = getStyles(priorityStyle);

    return (
        <View style={styles.taskContainer}>
            <Text style={[styles.taskTitle, styles.txt]}>{title}</Text>
            <Text style={[styles.txt]}>
                {new Date(date).toISOString().split("T")[0]}
            </Text>
            <Text style={[styles.taskHour, styles.txt]}>{hour}</Text>
        </View>
    );
}

const getStyles = (priority) =>
    StyleSheet.create({
        taskContainer: {
            backgroundColor: colors[`${priority}Bg`],
            borderColor: colors[priority],
            borderWidth: 2,
            borderRadius: 5,
            padding: 2,
            marginBlock: 10,
            with: "auto",
        },
        txt: {
            color: colors[priority],
            fontSize: 11,
        },
        taskTitle: {
            fontWeight: "bold",
        },
    });

export default Task;
