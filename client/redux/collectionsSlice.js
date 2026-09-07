import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCollections: [],
    currentCollection: null,
    loading: false,
};

const collectionsSlice = createSlice({
    name: "collections",
    initialState: initialState,
    reducers: {
        setAllCollections(state, action) {
            state.allCollections = action.payload;
        },
        setCurrentCollection(state, action) {
            state.currentCollection = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        clearCurrentCollection(state) {
            state.currentCollection = null;
        },
    },
});

export const {
    setAllCollections,
    setCurrentCollection,
    setLoading,
    clearCurrentCollection,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
