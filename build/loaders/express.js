"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config"));
const api_1 = __importDefault(require("../api"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
exports.default = ({ app }) => {
    app.get('/healthCheck', (req, res) => {
        const healthCheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
        };
        try {
            return res.json(healthCheck);
        }
        catch (e) {
            return res.status(503).send();
        }
    });
    const upOpt = {
        limits: { fileSize: 10 * 1024 * 1024 },
        abortOnLimit: true,
        responseOnLimit: 'File Size Limit exceeded',
        // debug: true,
        parseNested: true,
        // useTempFiles: true,
        // tempFileDir: os.tmpdir(),
        preserveExtension: 4,
    };
    app.use((0, express_fileupload_1.default)(upOpt));
    app.use('/public', express_1.default.static(__dirname + '/../../public'));
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(config_1.default.api.prefix, (0, api_1.default)());
};
//# sourceMappingURL=express.js.map