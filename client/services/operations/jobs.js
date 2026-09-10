import { apiConnector } from "../apiconnector";
import { jobEndpoints } from "../apis";
import { setAllJobs, setDashboard, setLoading } from "../../redux/jobsSlice";
import toast from "react-hot-toast";

const {
    CREATE_JOB_API,
    GET_JOBS_API,
    GET_JOB_BY_ID_API,
    UPDATE_JOB_API,
    DELETE_JOB_API,
    GET_DASHBOARD_API,
    UPDATE_JOB_STATUS_API,
    GET_JOB_BY_STATUS_API
} = jobEndpoints;


// CREATE JOB
export function createJob(token, jobData) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Adding job...");
        try {
            const response = await apiConnector("POST", CREATE_JOB_API, jobData, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Job added successfully!");
            // Refresh all jobs list
            await dispatch(fetchJobs(token));
            await fetchDashboard(token);
            return response.data.job;

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to add job");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}


// GET ALL JOBS
export function fetchJobs(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_JOBS_API, null, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setAllJobs(response.data.jobs));

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to fetch jobs");
        } finally {
            dispatch(setLoading(false));
        }
    };
}


// GET JOB BY ID
export function fetchJobById(token, id) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", GET_JOB_BY_ID_API, { id }, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            return response.data.job;

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to fetch job");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

export const fetchJobByStatus = async (token, status) => {
    dispatch(setLoading(true));
    try {
        const response = await apiConnector("POST", GET_JOB_BY_STATUS_API, { status }, {
            Authorization: `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        return response.data.job;

    } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to fetch job");
    } finally {
        dispatch(setLoading(false));
    }
}

export function updateStatus(token, id, status) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", UPDATE_JOB_STATUS_API, { id, status }, {
                Authorization: `Bearer ${token}`,
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            await dispatch(fetchJobs(token));
            await dispatch(fetchDashboard(token));
            toast.success("Job status updated successfully!");
            return response.data.job;
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Failed to update job status");
        } finally {
            dispatch(setLoading(false));
        }
    }
}
// UPDATE JOB
export function updateJob(token, jobData) {

    return async (dispatch) => {
        dispatch(setLoading(true));

        const toastId = toast.loading("Updating job...");
        try {
            const response = await apiConnector("POST", UPDATE_JOB_API, { ...jobData }, {
                Authorization: `Bearer ${token}`,
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Job updated successfully!");
            // Refresh all jobs list
            await dispatch(fetchJobs(token));
            return response.data.job;

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to update job");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}


// DELETE JOB
export function deleteJob(token, id) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Deleting job...");
        try {
            const response = await apiConnector("POST", DELETE_JOB_API, { id }, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Job deleted successfully!");
            // Refresh all jobs list
            await dispatch(fetchJobs(token));

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to delete job");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}


// GET DASHBOARD DATA
//return total application , pitpleine, reccent jobs
export function fetchDashboard(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_DASHBOARD_API, null, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setDashboard(response.data.dashboard));
            return response.data.dashboard;

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to fetch dashboard");
        } finally {
            dispatch(setLoading(false));
        }
    };
}