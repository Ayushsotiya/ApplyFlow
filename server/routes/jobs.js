const express = require('express');

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getDashboard
} = require('../controllers/job')

const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createJob)
router.get('/get', auth, getJobs)
router.post('/get-by-id', auth, getJobById)     // id in req.body
router.post('/update', auth, updateJob)          // id + data in req.body
router.post('/delete', auth, deleteJob)          // id in req.body
router.get('/dashboard', auth, getDashboard)

module.exports = router