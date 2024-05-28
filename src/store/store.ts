import { configureStore } from "@reduxjs/toolkit";
import snakeReducer from "./snakeSlice";
import appleReducer from './appleSlice'

export const store = configureStore({
    reducer:{
        snakeMove: snakeReducer,
        apple: appleReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;