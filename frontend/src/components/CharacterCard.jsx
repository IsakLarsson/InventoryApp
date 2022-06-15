import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import {
    deleteCharacter,
    selectCharacter,
} from "../features/characters/characterSlice";
import { useNavigation } from "@react-navigation/native";

const CharacterCard = ({ character }) => {
    const { gold, silver, copper } = character.coins;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onDelete = () => {
        dispatch(deleteCharacter(character._id));
    };

    const onSelect = () => {
        dispatch(selectCharacter(character));
        navigation.navigate("CharacterScreen");
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.name}>{character.name}</Text>
                <Pressable onPress={onDelete}>
                    <Text style={[styles.name, { color: "red" }]}>X</Text>
                </Pressable>
            </View>

            <Text style={styles.text}>
                {gold} Gold, {silver} Silver, {copper} Copper
            </Text>
            <Pressable onPress={onSelect}>
                <Text style={[styles.name, { color: "#67ee67" }]}>Select</Text>
            </Pressable>
        </View>
    );
};

export default CharacterCard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2d2d33",
        borderRadius: 5,
        width: "100%",
        margin: 3,
        padding: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        color: "white",
    },
    text: {
        fontSize: 16,
        color: "#eee",
    },
});
