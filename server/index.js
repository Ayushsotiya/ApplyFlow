require("dotenv").config();
const express = require("express");
const pool = require("./config/db");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const jobRoutes = require('./routes/jobs');
const collectionRoutes = require('./routes/collections');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "https://apply-flow-nine-green.vercel.app",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/collections', collectionRoutes);



app.get("/", (req, res) => {
    res.json({
        message: "Hello World",
    });
});

// app.get("/db-test", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT NOW()");

//         res.json({
//             message: "Database connected",
//             time: result.rows[0].now,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Database connection failed",
//         });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
