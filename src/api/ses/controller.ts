import { promisify } from 'util';
import { join } from 'path';
import $console from 'colorful-console-log';
import Papa from 'papaparse';

import database from '../../loaders/database';
import Logger from '../../loaders/logger';
import mailerService from '../../utils/mailer';
import {
  textOverlayAttachment,
  textOverlayBuffer,
} from '../../utils/certificate/certificate';
import { readCSV } from '../../utils/csv/csv';

const sleep = promisify(setTimeout);

export async function sendMail(data: any) {
  try {
    await mailerService(data.template, data.subject, data, data.email);
    return {
      status: 200,
      response: {
        success: true,
        message: `email sent to  ${data.email}`,
      },
    };
  } catch (err: any) {
    Logger.error(err.error);
    return {
      status: err.code || 409,
      response: { success: false, message: err.error || 'ISR' },
    };
  }
}

export async function sendMassMail(data: any) {
  try {
    const db = await database();
    const collection = db.collection(data.collection);
    const mails = await collection.find({}).toArray();

    for (const email of mails) {
      await mailerService(data.template, data.subject, '', email.email);
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
  } catch (err: any) {
    Logger.error(err.error);
    return {
      status: err.code || 409,
      response: { success: false, message: err.error || 'ISR' },
    };
  }
}

export async function sendCsvMail(req: any) {
  try {
    const options = {
      delimiter: '\n',
      header: true,
    };

    const data = await readCSV(req.files.csv.data.toString(), options);
    if (!data) {
      return {
        status: 400,
        response: {
          success: false,
          message: 'csv file is empty',
        },
      };
    }

    if (req.body.message) {
      $console.orange(req.body.message);
    }
    for (const { _id, email } of data) {
      await sleep(250);
      $console.green(`mail sent to ${email} with ${_id}`);
    }

    return {
      status: 200,
      response: {
        success: true,
        data,
        message: `email sent `,
      },
    };
  } catch (err: any) {
    Logger.error(err.error);
    return {
      status: err.code || 409,
      response: { success: false, message: err.message || 'ISR' },
    };
  }
}

export async function sendCertificateMail(req: any) {
  try {
    $console.orange('Sending Figma Fiesta certificates');

    const { color, font_size, yOffset } = req.body;
    const db = await database();
    const collection = db.collection(req.body.collection);
    const Certificate = req.body.certificate;
    const mails = await collection.find({}).toArray();

    for (const { name, email } of mails) {
      await textOverlayAttachment(name, Certificate);
      const path = join(__dirname + '../../../../certificate.png');
      const filename = `${name}.png`;
      const attachment = [{ filename, path }];
      await mailerService(
        req.body.template,
        req.body.subject,
        name,
        email,
        attachment
      );

      // await mailerService(req.body.template, req.bod-y.subject, '', email);
      await sleep(1000);
      $console.green(`mail sent to ${email}`);
    }

    $console.orange('Figma Fiesta certificates sent');
    return {
      status: 200,
      response: {
        success: true,
        message: `email sent `,
      },
    };
  } catch (err: any) {
    Logger.error(err.message);

    return {
      status: err.code || 409,
      response: { success: false, message: err.error || 'ISR' },
    };
  }
}
