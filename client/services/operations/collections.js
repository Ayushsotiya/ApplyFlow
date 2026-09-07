import { apiConnector } from "../apiconnector";
import { collectionEndpoints } from "../apis";
import {
    setAllCollections,
    setCurrentCollection,
    setLoading,
} from "../../redux/collectionsSlice";
import toast from "react-hot-toast";

const {
    CREATE_COLLECTION_API,
    GET_COLLECTIONS_API,
    GET_COLLECTION_BY_ID_API,
    UPDATE_COLLECTION_API,
    DELETE_COLLECTION_API,
    ADD_JOB_TO_COLLECTION_API,
    REMOVE_JOB_FROM_COLLECTION_API,
} = collectionEndpoints;


// CREATE COLLECTION
export function createCollection(token, name) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Creating collection...");
        try {
            const response = await apiConnector("POST", CREATE_COLLECTION_API, { name }, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Collection created successfully!");
            dispatch(fetchCollections(token));
            return response.data.collection;

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to create collection");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}


// GET ALL COLLECTIONS
export function fetchCollections(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_COLLECTIONS_API, null, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setAllCollections(response.data.collections));

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to fetch collections");
        } finally {
            dispatch(setLoading(false));
        }
    };
}


// GET COLLECTION BY ID (with its jobs)
export function fetchCollectionById(token, id) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", GET_COLLECTION_BY_ID_API, { id }, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setCurrentCollection(response.data.collection));
            return response.data.collection;

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to fetch collection");
        } finally {
            dispatch(setLoading(false));
        }
    };
}


// UPDATE COLLECTION
export function updateCollection(token, id, name) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Updating collection...");
        try {
            const response = await apiConnector("POST", UPDATE_COLLECTION_API, { id, name }, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Collection updated successfully!");
            dispatch(fetchCollections(token));
            return response.data.collection;

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to update collection");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}


// DELETE COLLECTION
export function deleteCollection(token, id) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Deleting collection...");
        try {
            const response = await apiConnector("POST", DELETE_COLLECTION_API, { id }, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Collection deleted successfully!");
            dispatch(fetchCollections(token));

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to delete collection");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}


// ADD JOB TO COLLECTION
export function addJobToCollection(token, id, jobId) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Adding job to collection...");
        try {
            const response = await apiConnector("POST", ADD_JOB_TO_COLLECTION_API, { id, jobId }, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Job added to collection!");
            // Refresh the current collection view
            dispatch(fetchCollectionById(token, id));
            return response.data.collectionJob;

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to add job to collection");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}


// REMOVE JOB FROM COLLECTION
export function removeJobFromCollection(token, id, jobId) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Removing job from collection...");
        try {
            const response = await apiConnector("POST", REMOVE_JOB_FROM_COLLECTION_API, { id, jobId }, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Job removed from collection!");
            // Refresh the current collection view
            dispatch(fetchCollectionById(token, id));

        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to remove job from collection");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}
