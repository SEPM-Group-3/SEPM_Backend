"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodemailerMail = exports.sendEmail = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const ses = new aws_sdk_1.default.SES({
    apiVersion: '2019-09-27',
    region: config_1.default.region,
    credentials: new aws_sdk_1.default.Credentials({
        accessKeyId: config_1.default.accessKeyId,
        secretAccessKey: config_1.default.secretAccessKey,
    }),
});
const sendEmail = async (mail) => {
    let transporter = nodemailer_1.default.createTransport({
        SES: { ses, aws: aws_sdk_1.default },
    });
    let request = transporter.sendMail(mail);
    return request;
};
exports.sendEmail = sendEmail;
const createNodemailerMail = (html, text, subject, receiverEmail, attachments // attachments as an optional parameter
) => {
    const mail = attachments
        ? {
            from: config_1.default.from,
            to: receiverEmail,
            replyTo: config_1.default.replyTo,
            subject,
            text,
            html,
            attachments,
        }
        : {
            from: config_1.default.from,
            to: receiverEmail,
            replyTo: config_1.default.replyTo,
            subject,
            text,
            html,
        };
    return mail;
};
exports.createNodemailerMail = createNodemailerMail;
//# sourceMappingURL=awsService.js.map