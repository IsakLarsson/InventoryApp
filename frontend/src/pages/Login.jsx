import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button
                onPress={() => {
                    navigation.navigate("Dashboard");
                }}
                title="Login"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
