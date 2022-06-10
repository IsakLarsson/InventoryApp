import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import axios from "axios";

export default function Login({ navigation }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");

    const onCreateUser = async () => {
        alert("create");
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Create Account</Text>

            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />
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
            <CustomInput
                placeholder="Confirm Password"
                value={passwordConfirm}
                setValue={setPasswordConfirm}
                secureTextEntry={true}
            />

            <CustomButton
                text="Create new account"
                onPress={onCreateUser}
                type="PRIMARY"
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
