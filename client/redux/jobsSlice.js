import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allJobs: [],
    dashboard: null,
    loading: false,
};

const jobSlice = createSlice({
    name: "jobs",
    initialState: initialState,
    reducers: {
        setAllJobs(state, action) {
            state.allJobs = action.payload;
        },
        setDashboard(state, action) {
            state.dashboard = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },

    },
});

export const { setAllJobs, setDashboard, setLoading } = jobSlice.actions;
export default jobSlice.reducer;