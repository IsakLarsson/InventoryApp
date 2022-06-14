import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { login, resetAuth } from "../features/auth/authSlice";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }
        if (isSuccess || user) {
            navigation.navigate("Dashboard");
        }
        dispatch(resetAuth());
    }, [user, isError, isSuccess, message, dispatch]);

    const onSignIn = async () => {
        const userData = {
            email,
            password,
        };

        dispatch(login(userData));
    };
    const onForgotPassword = async () => {
        alert("jag glum");
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>LOGIN</Text>
            <Text style={styles.text}>Start slaying those dragons</Text>

            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
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
    text: {
        fontSize: 16,
        color: "#eee",
        marginBottom: 30,
    },
});
