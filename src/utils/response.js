const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "abhinav1024.be23@chitkarauniversity.edu.in";

function successResponse(data) {
    return {
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data,
    };
}

function errorResponse(message) {
    return {
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: message,
    };
}

module.exports = { successResponse, errorResponse };
