import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./src/pages/Dashboard";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import CharacterScreen from "./src/pages/CharacterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen
                        name="CharacterScreen"
                        component={CharacterScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
