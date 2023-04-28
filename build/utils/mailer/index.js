"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const logger_1 = __importDefault(require("../../loaders/logger"));
const awsService_1 = require("./awsService");
const templateService_1 = require("./templateService");
const mailerService = async (template, subject, data, email, attachments) => {
    const path = `/public/template/${template}.html`;
    let htmlBuffer = await fs_1.promises.readFile((0, path_1.join)(__dirname, '/../../../', path));
    let mail = (0, awsService_1.createNodemailerMail)((0, templateService_1.getTemplatedString)(data, htmlBuffer.toString()), '', subject, email, attachments);
    try {
        await (0, awsService_1.sendEmail)(mail);
    }
    catch (err) {
        logger_1.default.error(err || 'Error sending SES email');
        throw err;
    }
};
exports.default = mailerService;
//# sourceMappingURL=index.js.map