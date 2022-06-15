import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import characterReducer from "../features/characters/characterSlice";
import { composeWithDevTools } from "remote-redux-devtools";
/* 
const ipMatch = Constants.manifest.hostUri.match(/([0-9.]+):/)[1]; */
console.log(ipMatch);
export const store = configureStore({
    reducer: {
        auth: authReducer,
        characters: characterReducer,
    },
    /* middleware: composeWithDevTools({
        hostname: `${ipMatch ? ipMatch[1] : "localhost"}:19000`,
    }), */
});
