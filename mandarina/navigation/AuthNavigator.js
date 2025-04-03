import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Tab = createBottomTabNavigator();

export default function AuthNavigator({ setIsLoggedIn }) {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Login">
                {(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
            <Tab.Screen name="Register">
                {(props) => <Register {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
