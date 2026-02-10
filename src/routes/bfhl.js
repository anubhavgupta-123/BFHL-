const express = require("express");
const { successResponse, errorResponse } = require("../utils/response");
const validateRequest = require("../middleware/validate");
const fibonacci = require("../handlers/fibonacci");
const filterPrimes = require("../handlers/prime");
const computeLCM = require("../handlers/lcm");
const computeHCF = require("../handlers/hcf");
const askAI = require("../handlers/ai");

const router = express.Router();

// GET /health
router.get("/health", (req, res) => {
    const OFFICIAL_EMAIL =
        process.env.OFFICIAL_EMAIL ||
        "anubhav1099.be23@chitkarauniversity.edu.in";
    return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
    });
});

// POST /bfhl
router.post("/bfhl", validateRequest, async (req, res, next) => {
    try {
        const { operationKey, operationValue } = req;
        let result;

        switch (operationKey) {
            case "fibonacci":
                result = fibonacci(operationValue);
                break;

            case "prime":
                result = filterPrimes(operationValue);
                break;

            case "lcm":
                result = computeLCM(operationValue);
                break;

            case "hcf":
                result = computeHCF(operationValue);
                break;

            case "AI":
                result = await askAI(operationValue);
                break;

            default:
                return res.status(400).json(errorResponse("Invalid operation"));
        }

        return res.status(200).json(successResponse(result));
    } catch (error) {
        next(error);
    }
});

module.exports = router;
