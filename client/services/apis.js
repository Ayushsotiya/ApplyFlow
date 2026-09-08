const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api";

export const authEndpoints = {
  SENDOTP_API: `${BASE_URL}/auth/send-otp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
};

export const jobEndpoints = {
  CREATE_JOB_API: `${BASE_URL}/jobs/create`,
  GET_JOBS_API: `${BASE_URL}/jobs/get`,
  GET_JOB_BY_ID_API: `${BASE_URL}/jobs/get-by-id`,    // POST: { id }
  UPDATE_JOB_API: `${BASE_URL}/jobs/update`,
  UPDATE_JOB_STATUS_API: `${BASE_URL}/jobs/update-status`,          // POST: { id, ...fields }
  DELETE_JOB_API: `${BASE_URL}/jobs/delete`,            // POST: { id }
  GET_DASHBOARD_API: `${BASE_URL}/jobs/dashboard`,
};

export const collectionEndpoints = {
  CREATE_COLLECTION_API: `${BASE_URL}/collections/create`,
  GET_COLLECTIONS_API: `${BASE_URL}/collections/get`,
  GET_COLLECTION_BY_ID_API: `${BASE_URL}/collections/get-by-id`,  // POST: { id }
  UPDATE_COLLECTION_API: `${BASE_URL}/collections/update`,         // POST: { id, name }
  DELETE_COLLECTION_API: `${BASE_URL}/collections/delete`,         // POST: { id }
  ADD_JOB_TO_COLLECTION_API: `${BASE_URL}/collections/add-job`,    // POST: { id, jobId }
  REMOVE_JOB_FROM_COLLECTION_API: `${BASE_URL}/collections/remove-job`, // POST: { id, jobId }
};