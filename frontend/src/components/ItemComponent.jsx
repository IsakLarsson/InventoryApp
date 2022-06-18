import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../features/characters/characterSlice";
import React from "react";

const ItemComponent = ({ item }) => {
    const dispatch = useDispatch();
    const { selectedCharacter } = useSelector((state) => state.characters);

    const onDelete = () => {
        console.log("delete item: ", item);
        dispatch(deleteItem({ id: selectedCharacter._id, item }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{item.itemName}</Text>
            <Pressable onPress={onDelete}>
                <Text
                    style={[
                        styles.name,
                        { color: "red", fontSize: 30, fontWeight: "bold" },
                    ]}
                >
                    X
                </Text>
            </Pressable>
        </View>
    );
};

export default ItemComponent;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 5,
        width: "100%",
        backgroundColor: "#7a7a7a",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#eee",
    },
});
