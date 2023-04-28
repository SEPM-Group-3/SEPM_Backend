"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textOverlayBuffer = exports.textOverlayAttachment = void 0;
const jimp_1 = __importDefault(require("jimp"));
const textOverlayAttachment = async (name, url) => {
    const image = await jimp_1.default.read(url);
    image.scaleToFit(1300, jimp_1.default.AUTO, jimp_1.default.RESIZE_BEZIER);
    const font = await jimp_1.default.loadFont(jimp_1.default.FONT_SANS_64_BLACK);
    image.print(font, 0, 420, {
        text: name,
        alignmentX: jimp_1.default.HORIZONTAL_ALIGN_CENTER,
        alignmentY: 450,
    }, 1300, 900);
    const file = 'certificate.' + image.getExtension();
    image.write(file);
};
exports.textOverlayAttachment = textOverlayAttachment;
const textOverlayBuffer = async (name, url, color, font_size, yOffset) => {
    try {
        const jimp_options = {
            FONT_64_WHITE: jimp_1.default.FONT_SANS_64_WHITE,
            FONT_64_BLACK: jimp_1.default.FONT_SANS_64_BLACK,
            FONT_32_WHITE: jimp_1.default.FONT_SANS_32_WHITE,
            FONT_32_BLACK: jimp_1.default.FONT_SANS_32_BLACK,
        };
        const jimp_font = jimp_options[`FONT_${font_size}_${color.toUpperCase()}`];
        const image = await jimp_1.default.read(`${url}`);
        image.scaleToFit(1300, jimp_1.default.AUTO, jimp_1.default.RESIZE_BEZIER);
        const font = await jimp_1.default.loadFont(jimp_font);
        image.print(font, 0, parseInt(yOffset), {
            text: name,
            alignmentX: jimp_1.default.HORIZONTAL_ALIGN_CENTER,
            alignmentY: 300,
        }, 1300, 900);
        const bufferImage = await image.getBase64Async(jimp_1.default.MIME_PNG);
        return { buffer: bufferImage, error: false, error_message: 'Success' };
    }
    catch (error) {
        return {
            buffer: null,
            error: true,
            error_message: error.message || 'Failed',
            name: null,
        };
    }
};
exports.textOverlayBuffer = textOverlayBuffer;
//# sourceMappingURL=certificate.js.map