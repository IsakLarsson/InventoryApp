import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetAuth } from "../features/auth/authSlice";
import CharacterForm from "../components/CharacterForm";
import {
    getCharacters,
    resetCharacters,
} from "../features/characters/characterSlice";
import CharacterCard from "../components/CharacterCard";

export default function Dashboard({ navigation }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { characters, selectedCharacter, isLoading, isError, message } =
        useSelector((state) => state.characters);

    const logoutUser = () => {
        dispatch(logout());
        dispatch(resetAuth());
        navigation.navigate("Login");
    };

    useEffect(() => {
        if (isError) {
            alert(message);
        }
        if (!user) {
            navigation.navigate("Login");
        }
        dispatch(getCharacters());

        return () => {
            /*  dispatch(resetCharacters()); */
            console.log("Dismounting dashboard");
        };
    }, [user, isError, message, selectedCharacter, dispatch]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                You are now logged in as *REDACTED*
            </Text>
            {characters.length > 0 ? (
                characters.map((character, index) => (
                    <CharacterCard character={character} key={index} />
                ))
            ) : (
                <Text style={styles.text}>
                    You have no characters yet! Create one!
                </Text>
            )}
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
    text: {
        fontSize: 16,
        color: "#eee",
        marginBottom: 30,
    },
});
