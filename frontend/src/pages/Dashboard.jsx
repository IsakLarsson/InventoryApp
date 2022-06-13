import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import CharacterForm from "../components/CharacterForm";

export default function Dashboard({ navigation }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const logoutUser = () => {
        dispatch(logout());
        dispatch(reset());
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                You are now logged in as {user.name}
            </Text>
            <CharacterForm />
            <CustomButton onPress={logoutUser} text="Logout" type="PRIMARY" />
        </View>
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
