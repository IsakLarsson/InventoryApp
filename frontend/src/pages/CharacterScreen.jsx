import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../components/CustomButton";
import { addItem } from "../features/characters/characterSlice";

const CharacterScreen = () => {
    const { selectedCharacter } = useSelector((state) => state.characters);
    const dispatch = useDispatch();

    const newItem = {
        itemName: "TestItem",
        value: { gold: 50, silver: 20, copper: 20 },
        description: "Makes you go zoom",
    };
    const onAddItem = () => {
        console.log("ADDING Item: ", newItem);
        dispatch(addItem({ id: selectedCharacter._id, newItem }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Name: {selectedCharacter.name}</Text>
            <Text style={styles.text}>ID: {selectedCharacter._id}</Text>
            <Text style={styles.text}>
                Gold: {selectedCharacter.coins.gold}, Silver:
                {selectedCharacter.coins.silver}, Copper:
                {selectedCharacter.coins.copper}
            </Text>
            <View>
                {selectedCharacter.inventory.length == 0 ? (
                    <Text style={styles.text}>Empty room</Text>
                ) : (
                    <>
                        {selectedCharacter.inventory.map((item, index) => (
                            <Text style={styles.text} key={index}>
                                {item.itemName}
                            </Text>
                        ))}
                    </>
                )}
                <CustomButton
                    onPress={onAddItem}
                    text="Add item"
                    type="PRIMARY"
                />
            </View>
        </View>
    );
};

export default CharacterScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,

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
