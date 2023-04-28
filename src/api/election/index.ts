import { NextFunction, Request, Response, Router } from 'express';
import Logger from '../../loaders/logger';

const ElectionRouter = Router();

ElectionRouter.post('/', handleVote);
ElectionRouter.get('/', handleGetCount);

import database from '../../loaders/database';

async function handleVote(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, to } = req.body;
    const db = await database();
    const collection = db.collection('events');
    const ongoingElections = await collection.findOne({ name });

    if (!ongoingElections) {
      throw { error: 'No such event', code: 404 };
    }

    if (ongoingElections.state !== 'Active') {
      throw { error: 'Event is not active', code: 400 };
    }
    // 1682681400000

    if (ongoingElections.timeLimit < Date.now()) {
      throw { error: 'Event has ended', code: 400 };
    }

    const updatedData = ongoingElections;
    updatedData.data[to] = updatedData.data[to] + 1;
    await collection.findOneAndUpdate({ name }, { $set: updatedData });
    res.status(200).json('updated successfully');
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

async function handleGetCount(req: Request, res: Response, next: NextFunction) {
  try {
    const db = await database();
    const collection = db.collection('events');
    const ongoingElections = await collection
      .find({ state: 'Active' })
      .toArray();
    res.status(200).json({ data: ongoingElections });
  } catch (err: any) {
    Logger.error(err.error);
    res
      .status(err.code || 503)
      .json({ success: false, message: err.error || 'ISR' });
  }
}

export default ElectionRouter;
