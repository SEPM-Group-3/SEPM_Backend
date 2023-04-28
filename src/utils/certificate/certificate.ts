import Jimp from 'jimp';
import { join } from 'path';

export const textOverlayAttachment = async (name: string, url: string) => {
  const image = await Jimp.read(url);
  image.scaleToFit(1300, Jimp.AUTO, Jimp.RESIZE_BEZIER);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
  image.print(
    font,
    0,
    420,
    {
      text: name,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: 450,
    },
    1300,
    900
  );
  const file = 'certificate.' + image.getExtension();
  image.write(file);
};

export const textOverlayBuffer = async (
  name: string,
  url: string,
  color: string,
  font_size: string,
  yOffset: string
) => {
  try {
    const jimp_options: any = {
      FONT_64_WHITE: Jimp.FONT_SANS_64_WHITE,
      FONT_64_BLACK: Jimp.FONT_SANS_64_BLACK,
      FONT_32_WHITE: Jimp.FONT_SANS_32_WHITE,
      FONT_32_BLACK: Jimp.FONT_SANS_32_BLACK,
    };

    const jimp_font = jimp_options[`FONT_${font_size}_${color.toUpperCase()}`];

    const image = await Jimp.read(`${url}`);
    image.scaleToFit(1300, Jimp.AUTO, Jimp.RESIZE_BEZIER);
    const font = await Jimp.loadFont(jimp_font);
    image.print(
      font,
      0,
      parseInt(yOffset),
      {
        text: name,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: 300,
      },
      1300,
      900
    );
    const bufferImage = await image.getBase64Async(Jimp.MIME_PNG);
    return { buffer: bufferImage, error: false, error_message: 'Success' };
  } catch (error: any) {
    return {
      buffer: null,
      error: true,
      error_message: error.message || 'Failed',
      name: null,
    };
  }
};
