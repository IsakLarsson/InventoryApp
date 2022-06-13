import axios from "axios";

const API_URL = "http://192.168.0.166:3000/api/characters/";

//Create new character
const createCharacter = async (characterData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, characterData, config);

    return response.data;
};

const characterService = {
    createCharacter,
};

export default characterService;
