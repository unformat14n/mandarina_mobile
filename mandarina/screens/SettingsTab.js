import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import colors from "../styles/colors";
import Checkbox from "../components/Checkbox";
import { useTheme } from "../context/ThemeContext";

function SettingsTab() {
    const { theme, toggleTheme, palette, setPalette } = useTheme();
    const styles = getStyles(theme, palette);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <ScrollView style={styles.scrollContainer}>
                <View>
                    <View style={styles.configContainer}>
                        <Text style={styles.settingHdr}>Appearance</Text>
                        <Text style={styles.subHdr}>Theme</Text>
                        <View style={styles.optContainer}>
                            {/* Dark Mode Checkbox */}
                            <Checkbox
                                labelTxt={"Dark Mode"}
                                checked={theme === "dark"}
                                onToggle={() =>
                                    theme !== "dark" && toggleTheme()
                                }
                            />
                            {/* Light Mode Checkbox */}
                            <Checkbox
                                labelTxt={"Light Mode"}
                                checked={theme === "light"}
                                onToggle={() =>
                                    theme !== "light" && toggleTheme()
                                }
                            />
                        </View>
                        <Text style={styles.subHdr}>Color Palette</Text>
                        <View style={styles.optContainer}>
                            <Checkbox
                                labelTxt={"Mandarina"}
                                checked={palette == "mandarina"}
                                onToggle={() =>
                                    palette !== "mandarina" &&
                                    setPalette("mandarina")
                                }
                            />
                            <Checkbox
                                labelTxt={"Peach Dreams"}
                                checked={palette == "peach"}
                                onToggle={() =>
                                    theme !== "peach" && setPalette("peach")
                                }
                            />
                            <Checkbox
                                labelTxt={"Coffee Espresso"}
                                checked={palette == "coffee"}
                                onToggle={() =>
                                    palette !== "coffee" && setPalette("coffee")
                                }
                            />
                            <Checkbox
                                labelTxt={"Olive Yards"}
                                checked={palette == "olive"}
                                onToggle={() =>
                                    palette !== "olive" && setPalette("olive")
                                }
                            />
                            <Checkbox
                                labelTxt={"Blueberry Sparks"}
                                checked={palette == "blueberry"}
                                onToggle={() =>
                                    palette !== "blueberry" &&
                                    setPalette("blueberry")
                                }
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const getStyles = (theme, palette) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors[theme].background,
            padding: 20,
            color: colors[theme].text,
        },
        title: {
            fontSize: 64,
            fontWeight: "bold",
            marginBottom: 20,
            color: colors[palette].primary,
        },
        scrollContainer: { height: "100%" },
        configContainer: {
            padding: 10,
            flexDirection: "column",
            backgroundColor: colors[theme].secondaryBg,
            borderRadius: 10,
        },
        optContainer: {
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            margin: 5,
            flexWrap: "wrap",
        },
        settingHdr: {
            fontSize: 24,
            fontWeight: "bold",
            color: colors[palette].secondary,
        },
        subHdr: {
            color: colors[theme].text,
            fontSize: 20,
            fontWeight: "bold",
        },
    });

export default SettingsTab;
