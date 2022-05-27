import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function App() {
    const [response, setResponse] = useState();

    const getChars = async () => {
        try {
            const response = await axios.get(
                "http://192.168.0.166:3000/api/characters"
            );
            setResponse(response);
            console.log(response.data.characters[0].name);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getChars();

        return () => {};
    }, []);

    return (
        <View style={styles.container}>
            {response ? (
                response.data.characters.map((character, index) => (
                    <Text key={index}> {character.name} </Text>
                ))
            ) : (
                <Text>Hej</Text>
            )}

            <StatusBar style="auto" />
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
