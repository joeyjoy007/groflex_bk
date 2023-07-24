"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
const response = (Status, resStatus, payload, message, res) => {
    return res.status(Status).json({
        status: resStatus,
        payload: payload,
        message: message,
        response: exports.response
    });
};
exports.response = response;
