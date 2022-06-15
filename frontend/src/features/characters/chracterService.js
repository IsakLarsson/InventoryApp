import axios from "axios";

const API_URL = "http://192.168.0.166:3000/api/characters/";

const createCharacter = async (characterData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, characterData, config);

    return response.data;
};

const getCharacters = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

const deleteCharacter = async (characterId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + characterId, config);

    return response.data;
};

const addItem = async (id, item, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    console.log("ADding item: ", item);
    const response = await axios.patch(
        `${API_URL}${id}/inventory/addItem`,
        item,
        config
    );

    return response.data;
};

const characterService = {
    createCharacter,
    getCharacters,
    deleteCharacter,
    addItem,
};

export default characterService;
