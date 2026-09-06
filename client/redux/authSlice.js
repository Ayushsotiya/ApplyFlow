import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('token') || 'null') : null,
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        setUser(state, value) {
            state.user = value.payload;
        },
        logout(state) {
            state.token = null;
            state.user = null;
            state.signupData = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        },
    },
});

export const { setSignupData, setLoading, setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;


