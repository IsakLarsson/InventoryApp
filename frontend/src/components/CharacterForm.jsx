import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { createCharacter } from "../features/characters/characterSlice";

const CharacterForm = () => {
    const [characterName, setCharacterName] = useState("");

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(createCharacter({ name: characterName }));
        setCharacterName("");
    };

    return (
        <View style={styles.container}>
            <Text>Create a new character</Text>
            <CustomInput
                placeholder={"Character name"}
                value={characterName}
                setValue={setCharacterName}
            />
            <CustomButton
                onPress={onSubmit}
                text="Create Character"
                type="PRIMARY"
            />
        </View>
    );
};

export default CharacterForm;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
