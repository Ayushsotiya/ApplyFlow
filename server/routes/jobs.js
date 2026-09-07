const express = require('express');

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/job')

const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createJob)
router.get('/get', auth, getJobs)
router.get('/get/:id', auth, getJobById)
router.put('/update/:id', auth, updateJob)
router.delete('/delete/:id', auth, deleteJob)

module.exports = router