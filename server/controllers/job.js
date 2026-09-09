const pool = require("../config/db");


// CREATE JOB
exports.createJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            company_name,
            job_title,
            description,
            job_url,
            job_type,
            location,
            salary,
            status,
            priority,
            note,
            applied_date
        } = req.body;

        if (!company_name || !job_title) {
            return res.status(400).json({
                success: false,
                message: "Company name and job title are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO jobs
            (
                user_id,
                company_name,
                job_title,
                description,
                job_url,
                job_type,
                location,
                salary,
                status,
                priority,
                note,
                applied_date
            )
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *`,
            [
                userId,
                company_name,
                job_title,
                description,
                job_url,
                job_type || "Onsite",
                location,
                salary,
                status || "Applied",
                priority || "Normal",
                note,
                applied_date
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Job added successfully",
            job: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create job"
        });
    }
};


// GET ALL JOBS
exports.getJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT *
             FROM jobs
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        return res.status(200).json({
            success: true,
            jobs: result.rows
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch jobs"
        });
    }
};


// GET SINGLE JOB
exports.getJobById = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required"
            });
        }

        const result = await pool.query(
            `SELECT *
             FROM jobs
             WHERE id = $1 AND user_id = $2`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            job: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch job"
        });
    }
};

exports.fetchJobByStatus = async (req, res) => {
    try {
        const userId = req.uer.id;
        const { status } = req.body;
        if (!status) {
            return res.status(500).json({
                success: false,
                message: 'status is not provided'
            })
        }
        if (status == 'all') {
            const jobs = await pool.query(
                `
                  SELECT * FROM jobs WHERE  user_id = $1 ORDERBY created_at ASC
                `,
                [userId]
            )
            return res.status(200).json({
                success: true,
                message: ' Job got fetched by status',
                jobs
            })
        }
        const jobs = await pool.query(
            `
              SELECT * FROM jobs WHERE status = $1 AND user_id = $2 ORDERBY created_at ASC
            `,
            [status, userId]
        )
        return res.status(200).json({
            success: true,
            message: ' Job got fetched by status',
            jobs
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch job by status'
        })
    }
}
// UPDATE JOB
exports.updateJob = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            id,
            company_name,
            job_title,
            job_type,
            description,
            job_url,
            location,
            salary,
            status,
            priority,
            note,
            applied_date
        } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required"
            });
        }

        const result = await pool.query(
            `UPDATE jobs
             SET
                company_name = COALESCE($1, company_name),
                job_title = COALESCE($2, job_title),
                job_type = COALESCE($3, job_type),
                description = COALESCE($4, description),
                job_url = COALESCE($5, job_url),
                location = COALESCE($6, location),
                salary = COALESCE($7, salary),
                status = COALESCE($8, status),
                priority = COALESCE($9, priority),
                note = COALESCE($10, note),
                applied_date = COALESCE($11, applied_date),
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $12 AND user_id = $13
             RETURNING *`,
            [
                company_name,
                job_title,
                job_type,
                description,
                job_url,
                location,
                salary,
                status,
                priority,
                note,
                applied_date,
                id,
                userId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update job"
        });
    }
};
exports.updateStatus = async (req, res) => {
    try {
        console.log('started at server end');
        const userId = req.user.id;
        const { id, status } = req.body;
        if (!status || !id) {
            return res.status(400).json({
                success: false,
                message: 'required status or id is missing'
            })
        }
        const updatedJob = await pool.query(
            `
            UPDATE jobs SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id =$3 returning *
            `,
            [status, id, userId]
        )
        if (updatedJob.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Status updated successfully",
            job: updatedJob.rows[0]
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to update status"
        });
    }
}

// DELETE JOB
exports.deleteJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required"
            });
        }

        const result = await pool.query(
            `DELETE FROM jobs
             WHERE id = $1 AND user_id = $2
             RETURNING id`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete job"
        });
    }
};



//dashboard
exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Total applications
        const total = await pool.query(
            `SELECT COUNT(*) 
             FROM jobs 
             WHERE user_id = $1`,
            [userId]
        );

        // Pipeline
        const pipeline = await pool.query(
            `SELECT status, COUNT(*) 
             FROM jobs
             WHERE user_id = $1
             GROUP BY status`,
            [userId]
        );

        // Recent jobs
        const recentJobs = await pool.query(
            `SELECT id, company_name, job_title, location, salary, status, updated_at
             FROM jobs
             WHERE user_id = $1
             ORDER BY updated_at DESC
             LIMIT 5`,
            [userId]
        );
        return res.status(200).json({
            success: true,
            dashboard: {
                totalApplications: Number(total.rows[0].count),
                pipeline: pipeline.rows,
                recentJobs: recentJobs.rows
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data"
        });
    }
};