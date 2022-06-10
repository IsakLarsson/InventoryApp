import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

export default function CustomButton({ onPress, text, type }) {
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1,
                },
                styles.container,
                styles[`container_${type}`],
            ]}
            onPress={onPress}
        >
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 15,
        marginVertical: 15,
        alignItems: "center",
        borderRadius: 5,
    },
    container_PRIMARY: {
        backgroundColor: "#2f61d6",
    },
    container_SECONDARY: {},
    text: {
        fontWeight: "bold",
    },
    text_PRIMARY: {
        color: "white",
    },
    text_SECONDARY: {
        color: "#2f61d6",
    },
});
