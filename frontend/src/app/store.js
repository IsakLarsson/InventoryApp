import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import characterReducer from "../features/characters/characterSlice";
import composeWithDevTools from "remote-redux-devtools";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        characters: characterReducer,
    },
});
