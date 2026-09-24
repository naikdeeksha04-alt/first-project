import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",

    initialState: {
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: null,
        success: false
    },

    reducers: {
        // SIGNUP
        getSignupRequest(state) {
            state.loading = true;
            state.errors = null;
        },

        getSignupDetails(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.errors = null;
        },

        // LOGIN
        getLoginRequest(state) {
            state.loading = true;
            state.errors = null;
        },

        getLoginDetails(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.errors = null;
        },

        // ERROR
        getError(state, action) {
            state.errors = action.payload;
            state.loading = false;
        },

        // CURRENT USER
        getCurrentRequest(state) {
            state.loading = true;
        },

        getCurrentUser(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.errors = null;
        },

        // LOGOUT
        getLogout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.errors = null;
        },

        // UPDATE USER
        getUpdateUserRequest(state) {
            state.loading = true;
            state.errors = null;
        },

        // PASSWORD
        getPasswordRequest(state) {
            state.loading = true;
            state.errors = null;
        },

        getPasswordSuccess(state, action) {
            state.success = action.payload;
            state.loading = false;
        },

        // CLEAR ERROR
        clearErrors(state) {
            state.errors = null;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice;