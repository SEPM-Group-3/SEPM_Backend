"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("../../loaders/logger"));
const s3Router = (0, express_1.Router)();
s3Router.post('/single-upload', handleSingleUpload);
s3Router.post('/multiple-upload', handleMultipleUpload);
s3Router.get('/get-files', handleGetFiles);
s3Router.get('/', handleCheck);
async function handleCheck(req, res, next) {
    try {
        res.status(200).json('S3 is working');
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
async function handleGetFiles(req, res, next) {
    try {
        res.status(200).json('File uploaded successfully');
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
async function handleSingleUpload(req, res, next) {
    try {
        res.status(200).json('File uploaded successfully');
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
async function handleMultipleUpload(req, res, next) {
    try {
        res.status(200).json('Multiple Files uploaded successfully');
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
exports.default = s3Router;
//# sourceMappingURL=index.js.map