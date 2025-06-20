"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.CustomError = void 0;
class CustomError extends Error {
}
exports.CustomError = CustomError;
const errorHandler = (statusCode, message, validationErrors) => {
    const error = new CustomError();
    error.statusCode = statusCode;
    error.message = message;
    error.validationErrors = validationErrors;
    return error;
};
exports.errorHandler = errorHandler;
