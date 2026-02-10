require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bfhlRoutes = require("./routes/bfhl");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use("/", bfhlRoutes);


app.use((req, res) => {
    res.status(404).json({
        is_success: false,
        error: `Route ${req.method} ${req.path} not found`,
    });
});


app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        is_success: false,
        error: statusCode === 500 ? "Internal server error" : err.message,
    });
});


app.listen(PORT, () => {
    console.log(`🚀 BFHL API running on http://localhost:${PORT}`);
});

module.exports = app;
