const express = require("express");

const {
    Signup,
    Login,
    sendotp,
    changePassword,
    deleteAccount,
} = require("../controllers/auth");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/send-otp", sendotp);
router.post("/change-password", auth, changePassword);
router.post("/delete-account", auth, deleteAccount);

module.exports = router;