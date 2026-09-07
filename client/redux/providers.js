"use client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";
import jobsReducer from "@/redux/jobsSlice";
import collectionsReducer from "@/redux/collectionsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        jobs: jobsReducer,
        collections: collectionsReducer,
    },
});

export default function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>;
}