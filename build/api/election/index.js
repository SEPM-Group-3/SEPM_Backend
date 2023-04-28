"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logger_1 = __importDefault(require("../../loaders/logger"));
const ElectionRouter = (0, express_1.Router)();
ElectionRouter.post('/', handleVote);
ElectionRouter.get('/', handleGetCount);
const database_1 = __importDefault(require("../../loaders/database"));
async function handleVote(req, res, next) {
    try {
        const { name, to } = req.body;
        const db = await (0, database_1.default)();
        const collection = db.collection('events');
        const ongoingElections = await collection.findOne({ name });
        if (!ongoingElections) {
            throw { error: 'No such event', code: 404 };
        }
        if (ongoingElections.state !== 'Active') {
            throw { error: 'Event is not active', code: 400 };
        }
        // 1682681400000
        if (ongoingElections.timeLimit < Date.now()) {
            throw { error: 'Event has ended', code: 400 };
        }
        const updatedData = ongoingElections;
        updatedData.data[to] = updatedData.data[to] + 1;
        await collection.findOneAndUpdate({ name }, { $set: updatedData });
        res.status(200).json('updated successfully');
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
async function handleGetCount(req, res, next) {
    try {
        const db = await (0, database_1.default)();
        const collection = db.collection('events');
        const ongoingElections = await collection
            .find({ state: 'Active' })
            .toArray();
        res.status(200).json({ data: ongoingElections });
    }
    catch (err) {
        logger_1.default.error(err.error);
        res
            .status(err.code || 503)
            .json({ success: false, message: err.error || 'ISR' });
    }
}
exports.default = ElectionRouter;
//# sourceMappingURL=index.js.map