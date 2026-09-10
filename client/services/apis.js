const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api";

export const authEndpoints = {
  SENDOTP_API: `${BASE_URL}/auth/send-otp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  CHANGE_PASSWORD_API: `${BASE_URL}/auth/change-password`,
  DELETE_ACCOUNT_API: `${BASE_URL}/auth/delete-account`,
};

export const jobEndpoints = {
  CREATE_JOB_API: `${BASE_URL}/jobs/create`,
  GET_JOBS_API: `${BASE_URL}/jobs/get`,
  GET_JOB_BY_ID_API: `${BASE_URL}/jobs/get-by-id`,
  GET_JOB_BY_STATUS_API: `${BASE_URL}/jobs/get-jobs-by-status`,
  UPDATE_JOB_API: `${BASE_URL}/jobs/update`,
  UPDATE_JOB_STATUS_API: `${BASE_URL}/jobs/update-status`,
  DELETE_JOB_API: `${BASE_URL}/jobs/delete`,
  GET_DASHBOARD_API: `${BASE_URL}/jobs/dashboard`,
};

export const collectionEndpoints = {
  CREATE_COLLECTION_API: `${BASE_URL}/collections/create`,
  GET_COLLECTIONS_API: `${BASE_URL}/collections/get`,
  GET_COLLECTION_BY_ID_API: `${BASE_URL}/collections/get-by-id`,
  UPDATE_COLLECTION_API: `${BASE_URL}/collections/update`,
  DELETE_COLLECTION_API: `${BASE_URL}/collections/delete`,
  ADD_JOB_TO_COLLECTION_API: `${BASE_URL}/collections/add-job`,
  REMOVE_JOB_FROM_COLLECTION_API: `${BASE_URL}/collections/remove-job`,
};