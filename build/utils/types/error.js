"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorClass extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = ErrorClass;
//# sourceMappingURL=error.js.map