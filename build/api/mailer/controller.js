"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCertificateMail = exports.sendCsvMail = exports.sendMassMail = exports.sendMail = void 0;
const util_1 = require("util");
const database_1 = __importDefault(require("../../loaders/database"));
const logger_1 = __importDefault(require("../../loaders/logger"));
const mailer_1 = __importDefault(require("../../utils/mailer"));
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
const certificate_1 = __importDefault(require("../../utils/certificate/certificate"));
const path_1 = require("path");
const colorful_console_log_1 = __importDefault(require("colorful-console-log"));
const sleep = (0, util_1.promisify)(setTimeout);
async function sendMail(data) {
    try {
        await (0, mailer_1.default)(data.template, data.subject, data, data.email);
        return {
            status: 200,
            response: {
                success: true,
                message: `email sent to  ${data.email}`,
            },
        };
    }
    catch (err) {
        logger_1.default.error(err.error);
        return {
            status: err.code || 409,
            response: { success: false, message: err.error || 'ISR' },
        };
    }
}
exports.sendMail = sendMail;
async function sendMassMail(data) {
    try {
        const db = await (0, database_1.default)();
        const collection = db.collection(data.collection);
        const mails = await collection.find({}).toArray();
        for (const email of mails) {
            await (0, mailer_1.default)(data.template, data.subject, '', email.email);
            await sleep(1000);
            console.log(`mail sent to ${email.email}`);
        }
        return {
            status: 200,
            response: {
                success: true,
                message: `email sent to  ${data.email}`,
            },
        };
    }
    catch (err) {
        logger_1.default.error(err.error);
        return {
            status: err.code || 409,
            response: { success: false, message: err.error || 'ISR' },
        };
    }
}
exports.sendMassMail = sendMassMail;
async function sendCsvMail(req) {
    try {
        const data = req.files.csv.data;
        fs_1.default.createReadStream(data)
            .pipe((0, csv_parse_1.parse)({
            delimiter: ',',
        }))
            .on('data', function (row) {
            // This will push the object row into the array
            data.push(row);
        })
            .on('error', function (error) {
            console.log(error.message);
        })
            .on('end', function () {
            // Here log the result array
            console.log('parsed csv data:');
            console.log(data);
        });
        return {
            status: 200,
            response: {
                success: true,
                message: `email sent `,
            },
        };
    }
    catch (err) {
        logger_1.default.error(err.error);
        return {
            status: err.code || 409,
            response: { success: false, message: err.error || 'ISR' },
        };
    }
}
exports.sendCsvMail = sendCsvMail;
async function sendCertificateMail(req) {
    try {
        colorful_console_log_1.default.orange('Sending Figma Fiesta certificates');
        const db = await (0, database_1.default)();
        const collection = db.collection(req.body.collection);
        const Certificate = req.body.certificate;
        const mails = await collection.find({}).toArray();
        for (const { name, email } of mails) {
            await (0, certificate_1.default)(name, Certificate);
            const path = (0, path_1.join)(__dirname + '../../../../certificate.png');
            const filename = `${name}.png`;
            const attachment = [{ filename, path }];
            await (0, mailer_1.default)(req.body.template, req.body.subject, name, email, attachment);
            // await mailerService(req.body.template, req.bod-y.subject, '', email);
            await sleep(1000);
            colorful_console_log_1.default.green(`mail sent to ${email}`);
        }
        colorful_console_log_1.default.orange('Figma Fiesta certificates sent');
        return {
            status: 200,
            response: {
                success: true,
                message: `email sent `,
            },
        };
    }
    catch (err) {
        logger_1.default.error(err.error);
        return {
            status: err.code || 409,
            response: { success: false, message: err.error || 'ISR' },
        };
    }
}
exports.sendCertificateMail = sendCertificateMail;
//# sourceMappingURL=controller.js.map