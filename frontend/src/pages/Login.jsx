import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function Login({ navigation }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const onSignIn = async () => {
        alert("signin");
    };
    const onForgotPassword = async () => {
        alert("signin");
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>LOGIN</Text>

            <CustomInput
                placeholder="Username"
                value={userName}
                setValue={setUserName}
            />
            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />

            <CustomButton text="Sign in" onPress={onSignIn} type="PRIMARY" />
            <CustomButton
                text="Forgot password?"
                onPress={onForgotPassword}
                type="SECONDARY"
            />
            <CustomButton
                text="Don't have an account? Register here"
                onPress={() => {
                    navigation.navigate("Register");
                }}
                type="SECONDARY"
            />
            {/* <Button
                onPress={() => {
                    navigation.navigate("Dashboard");
                }}
                title="Login"
            /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,

        backgroundColor: "#1a1a1a",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 10,
        color: "white",
    },
});
