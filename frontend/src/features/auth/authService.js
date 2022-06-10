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

const authService = {
    register,
};

export default authService;
