import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function Input({
    value,
    setValue,
    placeholder,
    secureTextEntry,
}) {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={styles.textInput}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        borderColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {},
});
