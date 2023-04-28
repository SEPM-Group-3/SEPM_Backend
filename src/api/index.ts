import { Router } from 'express';
import ElectionRouter from './election/index';

export default (): Router => {
  const app = Router();
  app.use('/election', ElectionRouter);
  return app;
};
