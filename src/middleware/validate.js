const VALID_KEYS = ["fibonacci", "prime", "lcm", "hcf", "AI"];

function validateRequest(req, res, next) {
    const body = req.body;

    // Must be a non-null object
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        return res.status(400).json({
            is_success: false,
            error: "Request body must be a JSON object",
        });
    }

    // Find which valid keys are present
    const presentKeys = Object.keys(body).filter((key) =>
        VALID_KEYS.includes(key)
    );

    // Must have exactly one valid key
    if (presentKeys.length === 0) {
        return res.status(400).json({
            is_success: false,
            error: `Request must contain exactly one of: ${VALID_KEYS.join(", ")}`,
        });
    }

    if (presentKeys.length > 1) {
        return res.status(400).json({
            is_success: false,
            error: `Request must contain only one of: ${VALID_KEYS.join(", ")}. Found: ${presentKeys.join(", ")}`,
        });
    }

    // Check for unknown keys
    const unknownKeys = Object.keys(body).filter(
        (key) => !VALID_KEYS.includes(key)
    );
    if (unknownKeys.length > 0) {
        return res.status(400).json({
            is_success: false,
            error: `Unknown keys in request: ${unknownKeys.join(", ")}`,
        });
    }

    const key = presentKeys[0];
    const value = body[key];

    // Type validation per key
    switch (key) {
        case "fibonacci": {
            if (!Number.isInteger(value)) {
                return res.status(400).json({
                    is_success: false,
                    error: "fibonacci value must be an integer",
                });
            }
            if (value < 0) {
                return res.status(400).json({
                    is_success: false,
                    error: "fibonacci value must be a non-negative integer",
                });
            }
            break;
        }

        case "prime":
        case "lcm":
        case "hcf": {
            if (!Array.isArray(value)) {
                return res.status(400).json({
                    is_success: false,
                    error: `${key} value must be an array of integers`,
                });
            }
            if (value.length === 0) {
                return res.status(400).json({
                    is_success: false,
                    error: `${key} array must not be empty`,
                });
            }
            for (let i = 0; i < value.length; i++) {
                if (!Number.isInteger(value[i])) {
                    return res.status(400).json({
                        is_success: false,
                        error: `${key} array must contain only integers. Invalid value at index ${i}: ${value[i]}`,
                    });
                }
            }
            break;
        }

        case "AI": {
            if (typeof value !== "string") {
                return res.status(400).json({
                    is_success: false,
                    error: "AI value must be a string",
                });
            }
            if (value.trim().length === 0) {
                return res.status(400).json({
                    is_success: false,
                    error: "AI question must not be empty",
                });
            }
            break;
        }
    }

    // Attach parsed info for the route handler
    req.operationKey = key;
    req.operationValue = value;
    next();
}

module.exports = validateRequest;
