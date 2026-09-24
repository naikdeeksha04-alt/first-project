import { userActions } from "./user-slice.js";
import { axiosInstance } from "../../utils/axios";


// =========================
// SIGNUP
// =========================
export const getSignup = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getSignupRequest());

        const { data } = await axiosInstance.post(
            "/v1/rent/user/signup",
            user
        );

        dispatch(userActions.getSignupDetails(data.user));

    } catch (error) {
        console.log("SIGNUP ERROR:", error.response?.data);

        dispatch(
            userActions.getError(
                error.response?.data?.message || "Signup failed"
            )
        );
    }
};


// =========================
// LOGIN
// =========================
export const getLogin = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getLoginRequest());

        console.log("LOGIN DATA:", user);

        const { data } = await axiosInstance.post(
            "/v1/rent/user/login",
            user
        );

        console.log("LOGIN RESPONSE:", data);

        dispatch(userActions.getLoginDetails(data.user));

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        console.log("LOGIN ERROR RESPONSE:", error.response?.data);

        dispatch(
            userActions.getError(
                error.response?.data?.message || "Login failed"
            )
        );
    }
};


// =========================
// CURRENT USER
// =========================
export const currentUser = () => async (dispatch) => {
    try {
        dispatch(userActions.getCurrentRequest());

        const { data } = await axiosInstance.get(
            "/v1/rent/user/me"
        );

        dispatch(userActions.getCurrentUser(data.user));

    } catch (error) {
        console.log("CURRENT USER ERROR:", error.response?.data);

        dispatch(userActions.getLogout(null));
    }
};


// =========================
// UPDATE USER
// =========================
export const updateUser = (updateUser) => async (dispatch) => {
    try {
        dispatch(userActions.getUpdateUserRequest());

        await axiosInstance.patch(
            "/v1/rent/user/updateMe",
            updateUser
        );

        const { data } = await axiosInstance.get(
            "/v1/rent/user/me"
        );

        dispatch(userActions.getCurrentUser(data.user));

    } catch (error) {
        console.log("UPDATE USER ERROR:", error.response?.data);

        dispatch(
            userActions.getError(
                error.response?.data?.message || "Update failed"
            )
        );
    }
};


// =========================
// FORGOT PASSWORD
// =========================
export const forgotPassword = (email) => async (dispatch) => {
    try {
        await axiosInstance.post(
            "/v1/rent/user/forgotPassword",
            { email }
        );

    } catch (error) {
        console.log("FORGOT PASSWORD ERROR:", error.response?.data);

        dispatch(
            userActions.getError(
                error.response?.data?.message ||
                "Forgot password failed"
            )
        );
    }
};


// =========================
// RESET PASSWORD
// =========================
export const resetPassword = (password, token) => async (dispatch) => {
    try {
        await axiosInstance.patch(
            `/v1/rent/user/resetPassword/${token}`,
            password
        );

    } catch (error) {
        console.log("RESET PASSWORD ERROR:", error.response?.data);

        dispatch(
            userActions.getError(
                error.response?.data?.message ||
                "Password reset failed"
            )
        );
    }
};


// =========================
// UPDATE PASSWORD
// =========================
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch(userActions.getPasswordRequest());

        await axiosInstance.patch(
            "/v1/rent/user/updateMyPassword",
            passwords
        );

        dispatch(userActions.getPasswordSuccess(true));

    } catch (error) {
        console.log("UPDATE PASSWORD ERROR:", error.response?.data);

        dispatch(
            userActions.getError(
                error.response?.data?.message ||
                "Password update failed"
            )
        );
    }
};


// =========================
// LOGOUT
// =========================
export const logout = () => async (dispatch) => {
    try {
        await axiosInstance.get(
            "/v1/rent/user/logout"
        );

        dispatch(userActions.getLogout(null));

    } catch (error) {
        console.log("LOGOUT ERROR:", error.response?.data);

        dispatch(
            userActions.getError(
                error.response?.data?.message ||
                "Logout failed"
            )
        );
    }
};