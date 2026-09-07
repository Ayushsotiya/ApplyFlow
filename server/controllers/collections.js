const pool = require("../config/db");

// CREATE COLLECTION
exports.createCollection = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Collection name is required",
            });
        }

        const result = await pool.query(
            `INSERT INTO collections (user_id, name)
             VALUES ($1, $2)
             RETURNING *`,
            [userId, name]
        );

        return res.status(201).json({
            success: true,
            message: "Collection created successfully",
            collection: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create collection",
        });
    }
};


// GET ALL COLLECTIONS
exports.getCollections = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT *
             FROM collections
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        return res.status(200).json({
            success: true,
            collections: result.rows,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch collections",
        });
    }
};


// GET SINGLE COLLECTION WITH ITS JOBS
exports.getCollectionById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const result = await pool.query(
            `SELECT
                c.id,
                c.name,
                c.created_at,
                j.id AS job_id,
                j.company_name,
                j.job_title,
                j.location,
                j.salary,
                j.status,
                j.priority,
                j.applied_date
             FROM collections c
             LEFT JOIN collection_jobs cj
                ON c.id = cj.collection_id
             LEFT JOIN jobs j
                ON cj.job_id = j.id
             WHERE c.id = $1
               AND c.user_id = $2
             ORDER BY j.created_at DESC`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        const collection = {
            id: result.rows[0].id,
            name: result.rows[0].name,
            created_at: result.rows[0].created_at,
            jobs: result.rows
                .filter(row => row.job_id !== null)
                .map(row => ({
                    id: row.job_id,
                    company_name: row.company_name,
                    job_title: row.job_title,
                    location: row.location,
                    salary: row.salary,
                    status: row.status,
                    priority: row.priority,
                    applied_date: row.applied_date,
                })),
        };

        return res.status(200).json({
            success: true,
            collection,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch collection",
        });
    }
};


// UPDATE COLLECTION
exports.updateCollection = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Collection name is required",
            });
        }

        const result = await pool.query(
            `UPDATE collections
             SET name = $1
             WHERE id = $2
               AND user_id = $3
             RETURNING *`,
            [name, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Collection updated successfully",
            collection: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update collection",
        });
    }
};


// DELETE COLLECTION
exports.deleteCollection = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM collections
             WHERE id = $1
               AND user_id = $2
             RETURNING id`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Collection deleted successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete collection",
        });
    }
};


// ADD JOB TO COLLECTION
exports.addJobToCollection = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id, jobId } = req.params;

        // Check collection belongs to user
        const collection = await pool.query(
            `SELECT id
             FROM collections
             WHERE id = $1
               AND user_id = $2`,
            [id, userId]
        );

        if (collection.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        // Check job belongs to user
        const job = await pool.query(
            `SELECT id
             FROM jobs
             WHERE id = $1
               AND user_id = $2`,
            [jobId, userId]
        );

        if (job.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        const result = await pool.query(
            `INSERT INTO collection_jobs (collection_id, job_id)
             VALUES ($1, $2)
             RETURNING *`,
            [id, jobId]
        );

        return res.status(201).json({
            success: true,
            message: "Job added to collection",
            collectionJob: result.rows[0],
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to add job to collection",
        });
    }
};


// REMOVE JOB FROM COLLECTION
exports.removeJobFromCollection = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id, jobId } = req.params;

        // Check collection
        const collection = await pool.query(
            `SELECT id
             FROM collections
             WHERE id = $1
             AND user_id = $2`,
            [id, userId]
        );

        if (collection.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Collection not found"
            });
        }

        // Delete job from collection_jobs
        const result = await pool.query(
            `DELETE FROM collection_jobs
             WHERE collection_id = $1
             AND job_id = $2
             RETURNING *`,
            [id, jobId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job is not in this collection"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job removed from collection"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove job from collection"
        });
    }
};