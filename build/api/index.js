"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ses_1 = __importDefault(require("./ses"));
const s3_1 = __importDefault(require("./s3"));
const index_1 = __importDefault(require("./election/index"));
exports.default = () => {
    const app = (0, express_1.Router)();
    app.use('/aws-SES', ses_1.default);
    app.use('/aws-S3', s3_1.default);
    app.use('/election', index_1.default);
    return app;
};
//# sourceMappingURL=index.js.map