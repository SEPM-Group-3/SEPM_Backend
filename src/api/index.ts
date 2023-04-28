import { Router } from 'express';
import sesRouter from './ses';
import s3Router from './s3';
import ElectionRouter from './election/index';

export default (): Router => {
  const app = Router();

  app.use('/aws-SES', sesRouter);
  app.use('/aws-S3', s3Router);
  app.use('/election', ElectionRouter);
  return app;
};
