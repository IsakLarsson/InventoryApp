import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import characterService from "./chracterService";

const initialState = {
    selectedCharacter: null,
    characters: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

//Create new character
export const createCharacter = createAsyncThunk(
    "characters/create",
    async (characterData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await characterService.createCharacter(characterData, token);
        } catch (error) {
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getCharacters = createAsyncThunk(
    "characters/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await characterService.getCharacters(token);
        } catch (error) {
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteCharacter = createAsyncThunk(
    "characters/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await characterService.deleteCharacter(id, token);
        } catch (error) {
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const addItem = createAsyncThunk(
    "characters/addItem",
    async ({ id, newItem }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await characterService.addItem(id, newItem, token);
        } catch (error) {
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteItem = createAsyncThunk(
    "characters/deleteItem",
    async ({ id, item }, thunkAPI) => {
        try {
            console.log("deleting from slice", item);
            const token = thunkAPI.getState().auth.user.token;
            return await characterService.deleteItem(id, item, token);
        } catch (error) {
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        resetCharacters: (state) => initialState,
        selectCharacter: (state, action) => {
            console.log("Selected char : ", action.payload);
            state.selectedCharacter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCharacter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCharacter.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.characters.push(action.payload.created_character);
            })
            .addCase(createCharacter.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getCharacters.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCharacters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.characters = action.payload.characters;
            })
            .addCase(getCharacters.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(deleteCharacter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCharacter.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log(action.payload);
                state.characters = state.characters.filter(
                    (character) =>
                        character._id !== action.payload.deletedCharacter._id
                );
            })
            .addCase(deleteCharacter.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(addItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log("added item: ", action.payload);
                state.selectedCharacter.inventory.push(
                    action.payload.addedItem
                );
            })
            .addCase(addItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(deleteItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log("added item: ", action.payload);
                state.selectedCharacter.inventory.filter(
                    (item) => item.name !== action.payload.deletedItem
                );
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload;
            });
    },
});

export const { resetCharacters, selectCharacter } = characterSlice.actions;
export default characterSlice.reducer;
