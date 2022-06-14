import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { register, resetAuth } from "../features/auth/authSlice";

export default function Login({ navigation }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");

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

    const onCreateUser = async () => {
        if (password !== passwordConfirm) {
            alert("Passwords do not match");
        } else {
            const userData = {
                email,
                name,
                password,
            };

            dispatch(register(userData));
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.text}>It's free real estate</Text>

            <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder="Username"
                value={name}
                setValue={setName}
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
    text: {
        fontSize: 16,
        color: "#eee",
        marginBottom: 30,
    },
});
