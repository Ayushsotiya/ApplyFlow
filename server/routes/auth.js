const express = require("express");

const {
    Signup,
    Login,
    sendotp
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/send-otp", sendotp);

module.exports = router;