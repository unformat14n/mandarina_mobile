import React, { useState, useEffect } from "react";
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
import { useUser } from "../context/UserContext";
import { taskService } from "../services/api";
import Task from "../components/Task";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const daySize = screenWidth / 7 - 1;
const rowHeight = (screenHeight * 0.8) / 5;

function Calendar() {
    const [curDate, setCurDate] = useState(new Date());
    const [view, setView] = useState("month");
    const { theme, palette } = useTheme();
    const styles = getStyles(theme, palette);
    const { userId } = useUser();
    const [tasks, setTasks] = useState([]);

    const handleNext = () => {
        if (view == "month") {
            setCurDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setMonth(newDate.getMonth() + 1);
                return newDate;
            });
        }
        if (view == "week") {
            setCurDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() + 7);
                return newDate;
            });
        }
        if (view == "day") {
            setCurDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() + 1);
                return newDate;
            });
        }
    };
    const handlePrev = () => {
        if (view == "month") {
            setCurDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setMonth(newDate.getMonth() - 1);
                return newDate;
            });
        }
        if (view == "week") {
            setCurDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() - 7);
                return newDate;
            });
        }
        if (view == "day") {
            setCurDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() - 1);
                return newDate;
            });
        }
    };

    const setToday = () => {
        setCurDate(new Date());
    };

    const getTasks = async () => {
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

    useEffect(() => {
        getTasks();
    }, [tasks]);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const renderMonth = () => {
        const year = curDate.getFullYear();
        const month = curDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayIndex = new Date(year, month, 1).getDay();

        const days = [];
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<View style={styles.emptyDay} key={`empty-${i}`} />);
        }

        let today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            let isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

            let dayTasks = tasks.filter((task) => {
                const taskDate = new Date(task.dueDate);
                return (
                    taskDate.getDate() === day &&
                    taskDate.getMonth() === month &&
                    taskDate.getFullYear() === year
                );
            });
            // console.log(dayTasks);

            const taskComps = dayTasks.map((task) => (
                <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    date={task.dueDate}
                    hour={`${task.hour}:${String(task.minute).padStart(
                        2,
                        "0"
                    )}`}
                    priority={task.priority}
                    status={task.status}
                />
            ));

            days.push(
                <View
                    key={`day-${day}`}
                    style={[isToday ? styles.today : {}, styles.day]}>
                    <Text style={[isToday ? styles.todayDate : styles.text]}>
                        {day}
                    </Text>
                    {taskComps}
                </View>
            );
        }

        return <View style={styles.calendar}>{days}</View>;
    };

    const weekHeader = () => {
        const year = curDate.getFullYear();
        const month = curDate.getMonth();
        const startOfWeek = new Date(curDate);
        startOfWeek.setDate(curDate.getDate() - curDate.getDay()); // Get Sunday

        const today = new Date();
        const weekDays = [
            <View style={styles.weekdaysHdr} key="hour-header">
                <Text
                    style={[
                        { textAlign: "center", fontWeight: "bold" },
                        styles.text,
                    ]}>
                    Hour
                </Text>
            </View>,
        ];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek.getTime()); // Create a new instance for each day
            day.setDate(startOfWeek.getDate() + i); // Move forward day by day
            let isToday =
                day.getDate() === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();
            weekDays.push(
                <View
                    style={styles.weekdaysHdr}
                    key={`day-header-${day.getTime()}`}>
                    <Text
                        style={[
                            { textAlign: "center", fontWeight: "bold" },
                            styles.text,
                        ]}>
                        {day.toLocaleDateString("default", {
                            weekday: "short",
                        })}
                    </Text>
                    <Text
                        style={[
                            isToday ? styles.weekToday : styles.text,
                            { textAlign: "center", fontWeight: "bold" },
                        ]}>
                        {day.toLocaleString("default", {
                            day: "numeric",
                        })}
                    </Text>
                </View>
            );
        }
        return weekDays;
    };

    const renderWeek = () => {
        const year = curDate.getFullYear();
        const month = curDate.getMonth();
        const startOfWeek = new Date(curDate);
        startOfWeek.setDate(curDate.getDate() - curDate.getDay()); // Get Sunday
        const today = new Date();
        const weekDays = [];

        for (let hour = 0; hour < 24; hour++) {
            const formattedHour =
                hour === 0
                    ? "12 AM"
                    : hour < 12
                    ? `${hour} AM`
                    : hour === 12
                    ? "12 PM"
                    : `${hour - 12} PM`;
            weekDays.push(
                <View key={`hour-${hour}`} style={styles.weekday}>
                    <Text style={styles.hourTxt}>{formattedHour}</Text>
                </View>
            );
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek.getTime()); // Create a new instance for each day
                day.setDate(startOfWeek.getDate() + i); // Move forward day by day

                let dayTasks = tasks.filter((task) => {
                    const taskDate = new Date(task.dueDate);
                    return (
                        taskDate.getDate() === day.getDate() &&
                        taskDate.getMonth() === day.getMonth() &&
                        taskDate.getFullYear() === day.getFullYear() &&
                        hour === task.hour
                    );
                });

                const taskComps = dayTasks.map((task) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        date={task.dueDate}
                        hour={`${task.hour}:${String(task.minute).padStart(
                            2,
                            "0"
                        )}`}
                        priority={task.priority}
                        status={task.status}
                    />
                ));

                weekDays.push(
                    <View
                        key={`day-${day.getTime()}-hour-${hour}`}
                        style={styles.weekday}>
                        {taskComps}
                    </View>
                );
            }
        }

        return <View style={styles.calendar}>{weekDays}</View>;
    };

    const renderDay = () => {
        const year = curDate.getFullYear();
        const month = curDate.getMonth();
        const day = curDate.getDate();
        const today = new Date();
        const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
        const hours = [];

        for (let hour = 0; hour < 24; hour++) {
            const formattedHour =
                hour === 0
                    ? "12 AM"
                    : hour < 12
                    ? `${hour} AM`
                    : hour === 12
                    ? "12 PM"
                    : `${hour - 12} PM`;

            let dayTasks = tasks.filter((task) => {
                const taskDate = new Date(task.dueDate);
                return (
                    taskDate.getDate() === day &&
                    taskDate.getMonth() === month &&
                    taskDate.getFullYear() === year &&
                    hour === task.hour
                );
            });

            const taskComps = dayTasks.map((task) => (
                <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    date={task.dueDate}
                    hour={`${task.hour}:${String(task.minute).padStart(
                        2,
                        "0"
                    )}`}
                    priority={task.priority}
                    status={task.status}
                />
            ));

            hours.push(
                <View key={`day-${day}-${hour}`} style={styles.dayHour}>
                    <Text style={styles.hourTxt}>{formattedHour}</Text>
                    {taskComps}
                </View>
            );
        }

        return <View style={styles.dayCalendar}>{hours}</View>;
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerInfo}>
                    <TouchableOpacity style={styles.btn} onPress={handlePrev}>
                        <Text style={styles.buttonText}>◀</Text>
                    </TouchableOpacity>

                    <Text style={styles.headerText}>
                        {curDate.toLocaleDateString("default", {
                            month: "long",
                            year: "numeric",
                        })}
                    </Text>

                    <TouchableOpacity style={styles.btn} onPress={handleNext}>
                        <Text style={styles.buttonText}>▶</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerInfo}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={(e) => setToday()}>
                        <Text style={styles.buttonText}>Today</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => setView("month")}>
                        <Text style={styles.text}>Month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => setView("week")}>
                        <Text style={styles.text}>Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={(e) => setView("day")}>
                        <Text style={styles.text}>Day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.buttonText}>Add Event</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.calendarHdr}>
                    {view == "month" &&
                        ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                            (day, index) => (
                                <Text
                                    key={index}
                                    style={[styles.daysHdr, styles.text]}>
                                    {day}
                                </Text>
                            )
                        )}
                    {view == "week" && weekHeader()}
                    {view == "day" && (
                        <Text style={styles.dayHdr}>
                            {curDate.toLocaleDateString("default", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                            })}
                        </Text>
                    )}
                </View>
            </View>

            {/* Calendar Grid */}
            <ScrollView style={styles.scrollView}>
                {view == "month" && renderMonth()}
                {view == "week" && renderWeek()}
                {view == "day" && renderDay()}
            </ScrollView>
        </View>
    );
}

const getStyles = (curTheme, palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors[curTheme].background,
        },
        text: {
            color: colors[curTheme].text,
        },
        header: {
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            height: screenHeight * 0.15,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        },
        headerInfo: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginTop: 10,
        },
        headerText: {
            fontSize: 24,
            color: colors[palette].secondary,
            fontWeight: "bold",
        },
        btn: {
            backgroundColor: colors[palette].primary,
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: colors[curTheme].background,
            fontSize: 18,
            fontWeight: "bold",
        },
        calendarHdr: {
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: "auto",
            marginBottom: 4,
        },
        daysHdr: {
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            width: daySize,
        },
        scrollView: {
            height: "100%",
        },
        calendar: {
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 10,
        },
        emptyDay: {
            width: daySize,
            height: rowHeight,
        },
        day: {
            width: daySize,
            minHeight: rowHeight,
            alignItems: "center",
        },
        today: {
            borderWidth: 2,
            borderColor: colors[palette].primary,
            borderRadius: 5,
        },
        todayDate: {
            fontWeight: "bold",
            color: colors[curTheme].background,
            backgroundColor: colors[palette].primary,
            padding: 5,
            margin: 5,
            borderRadius: 5,
        },
        weekdaysHdr: {
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            width: (screenWidth - 5) / 8,
        },
        hourTxt: {
            fontSize: 12,
            paddingLeft: 5,
            color: colors[curTheme].secondaryTxt,
        },
        weekday: {
            width: (screenWidth - 5) / 8,
            minHeight: 50,
            borderBottomWidth: 1,
            borderBottomColor: colors[curTheme].secondaryBg,
            height: "auto",
            // alignItems: "center",
            // justifyContent: "center",
        },
        weekToday: {
            fontWeight: "bold",
            color: colors[curTheme].background,
            backgroundColor: colors[palette].primary,
            borderRadius: 5,
            textAlign: "center",
        },

        dayCalendar: {
            flex: 1,
            flexDirection: "column",
            marginTop: 10,
        },

        dayHour: {
            minHeight: 50,
            borderBottomWidth: 1,
            borderBottomColor: colors[curTheme].secondaryBg,
        },

        dayHdr: {
            fontSize: 20,
            color: colors[palette].secondary,
            fontWeight: "bold",
            textAlign: "center",
        },
    });

export default Calendar;
