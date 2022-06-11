import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

export default function Dashboard({ navigation }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const logoutUser = () => {
        dispatch(logout());
        dispatch(reset());
        navigation.navigate("Login");
    };

    return (
        <View>
            <Text>You are now logged in as {user.name}</Text>
            <CustomButton onPress={logoutUser} text="Logout" type="PRIMARY" />
        </View>
    );
}

const styles = StyleSheet.create({});
