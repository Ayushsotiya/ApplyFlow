const express = require('express');

const {
    createCollection,
    getCollections,
    getCollectionById,
    updateCollection,
    deleteCollection,
    addJobToCollection,
    removeJobFromCollection
} = require('../controllers/collections');

const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createCollection)
router.get('/get', auth, getCollections)
router.post('/get-by-id', auth, getCollectionById)          // id in req.body
router.post('/update', auth, updateCollection)               // id + name in req.body
router.post('/delete', auth, deleteCollection)               // id in req.body
router.post('/add-job', auth, addJobToCollection)            // id + jobId in req.body
router.post('/remove-job', auth, removeJobFromCollection)    // id + jobId in req.body

module.exports = router;
