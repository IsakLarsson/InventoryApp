import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import { addItem } from "../features/characters/characterSlice";
import ItemComponent from "../components/ItemComponent";
import CustomInput from "../components/CustomInput";

const CharacterScreen = () => {
    const { selectedCharacter } = useSelector((state) => state.characters);
    const [itemName, setItemName] = useState(" ");
    const dispatch = useDispatch();

    const newItem = {
        itemName: itemName,
        value: { gold: 50, silver: 20, copper: 20 },
        description: "Makes you go zoom",
    };
    const onAddItem = () => {
        console.log("ADDING Item: ", newItem);
        dispatch(addItem({ id: selectedCharacter._id, newItem }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Name: {selectedCharacter.name}</Text>
            <Text style={styles.text}>ID: {selectedCharacter._id}</Text>
            <Text style={styles.text}>
                Gold: {selectedCharacter.coins.gold}, Silver:
                {selectedCharacter.coins.silver}, Copper:
                {selectedCharacter.coins.copper}
            </Text>

            {selectedCharacter.inventory.length == 0 ? (
                <Text style={styles.text}>Empty room</Text>
            ) : (
                <>
                    {selectedCharacter.inventory.map((item, index) => (
                        <ItemComponent item={item} key={`item: ${index} `} />
                    ))}
                </>
            )}
            <CustomInput
                placeholder={"Item name"}
                value={itemName}
                setValue={setItemName}
            />
            <CustomButton onPress={onAddItem} text="Add item" type="PRIMARY" />
        </ScrollView>
    );
};

export default CharacterScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        width: "100%",
        backgroundColor: "#1a1a1a",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        color: "white",
    },
    text: {
        fontSize: 16,
        color: "#eee",
    },
});
