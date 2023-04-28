"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("../../loaders/logger"));
const controller_1 = require("./controller");
const emailRouter = (0, express_1.Router)();
emailRouter.post('/', handleEmail);
emailRouter.post('/mass', handleMassMail);
emailRouter.post('/csv', handleCsvMail);
emailRouter.post('/certificate', handleCertificateMail);
async function handleEmail(req, res, next) {
    try {
        const message = await (0, controller_1.sendMail)(req.body);
        res.status(message.status || 503).json(message.response || 'ISR');
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
async function handleMassMail(req, res, next) {
    try {
        const message = await (0, controller_1.sendMassMail)(req.body);
        res.status(message.status || 503).json(message.response || 'ISR');
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
async function handleCsvMail(req, res, next) {
    try {
        const message = await (0, controller_1.sendCsvMail)(req);
        res.status(message.status || 503).json(message.response || 'ISR');
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
async function handleCertificateMail(req, res, next) {
    try {
        const message = await (0, controller_1.sendCertificateMail)(req);
        res.status(message.status || 503).json(message.response || 'ISR');
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
exports.default = emailRouter;
//# sourceMappingURL=index.js.map