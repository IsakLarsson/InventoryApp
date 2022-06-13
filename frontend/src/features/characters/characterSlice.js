import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import characterService from "./chracterService";

const initialState = {
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

export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCharacter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCharacter.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.characters.push(action.payload);
            })
            .addCase(createCharacter.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload;
            });
    },
});

export const { reset } = characterSlice.actions;
export default characterSlice.reducer;
