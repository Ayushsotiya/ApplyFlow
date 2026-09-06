const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";

export const authEndpoints = {
  SENDOTP_API: `${BASE_URL}/auth/send-otp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
};
