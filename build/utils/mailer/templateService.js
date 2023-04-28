"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplatedString = void 0;
const dot_1 = require("dot");
const logger_1 = __importDefault(require("../../loaders/logger"));
const getTemplatedString = (data, file) => {
    try {
        let templateVariable = (0, dot_1.template)(file);
        return templateVariable(data);
    }
    catch (err) {
        logger_1.default.error(err || 'Error in getting template string');
        throw err;
    }
};
exports.getTemplatedString = getTemplatedString;
//# sourceMappingURL=templateService.js.map