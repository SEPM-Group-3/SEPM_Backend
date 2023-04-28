"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCSV = void 0;
const papaparse_1 = __importDefault(require("papaparse"));
const readCSV = async (file, options) => {
    try {
        const data = await papaparse_1.default.parse(file, options);
        return data.data;
    }
    catch (error) {
        return error;
    }
};
exports.readCSV = readCSV;
//# sourceMappingURL=csv.js.map