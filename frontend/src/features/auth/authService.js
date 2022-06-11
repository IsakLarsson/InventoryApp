import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//add IP
const API_URL = "/api/user/";

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    console.log("RESPONSE: ", response);
    if (response.data) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    console.log("RESPONSE: ", response);
    if (response.data) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

//Logout user
const logout = async () => {
    await AsyncStorage.removeItem("user");
};

const authService = {
    register,
    logout,
    login,
};

export default authService;
