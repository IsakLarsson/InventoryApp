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
    const response = await axios.post(
        `${API_URL}${id}/inventory`,
        item,
        config
    );

    return response.data;
};

const deleteItem = async (id, item, token) => {
    const itemID = item._id;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    console.log("Deleting item: ", item);
    console.log("TOKEN SENT", token);
    console.log("character ID", id);
    const data = { itemName: item.itemName };
    //axios delete seems to be working different from the others
    const response = await axios.delete(
        `${API_URL}${id}/inventory/${itemID}`,
        config
    );

    console.log("RESPONSE DELETE:", response);
    return response.data;
};

const characterService = {
    createCharacter,
    getCharacters,
    deleteCharacter,
    addItem,
    deleteItem,
};

export default characterService;
