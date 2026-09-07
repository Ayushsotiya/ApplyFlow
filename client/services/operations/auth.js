import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { setLoading, setToken, setUser } from "@/redux/authSlice";

const { SENDOTP_API, SIGNUP_API, LOGIN_API } = authEndpoints;

export function sendOtp(email, router) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, { email });
            console.log("SENDOTP API RESPONSE:", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Failed to send OTP");
            }

            if (router) {
                router.push("/verify-otp");
            }
            return response.data;
        } catch (error) {
            console.error("SENDOTP API ERROR:", error);
            const message =
                error.response?.data?.message || error.message || "Failed to send OTP. Please try again.";
            alert(message);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function signup(data, router, onSuccess) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const payload = {
                name: data.fullName || data.name,
                email: data.email,
                password: data.password,
                otp: data.otp,
            };

            const response = await apiConnector("POST", SIGNUP_API, payload);
            console.log("SIGNUP API RESPONSE:", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Signup failed");
            }

            if (onSuccess) {
                onSuccess();
            } else if (router) {
                router.push("/login");
            }
            return response.data;
        } catch (error) {
            console.error("SIGNUP API ERROR:", error);
            const message =
                error.response?.data?.message || error.message || "Signup failed. Please try again.";
            alert(message);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export function login(email, password, router) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password });
            console.log("LOGIN API RESPONSE:", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message || "Login failed");
            }

            const token = response.data.token;
            const user = response.data.user;

            dispatch(setToken(token));
            dispatch(setUser(user));

            if (typeof window !== "undefined") {
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("user", JSON.stringify(user));
            }

            if (router) {
                router.push("/dashboard");
            }
            return response.data;
        } catch (error) {
            console.error("LOGIN API ERROR:", error);
            const message =
                error.response?.data?.message || error.message || "Invalid credentials. Please try again.";
            alert(message);
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };
}

