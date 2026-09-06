"use client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>;
}