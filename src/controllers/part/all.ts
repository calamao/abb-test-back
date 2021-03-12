import { RequestHandler } from 'express';
import Part from '../../models/Part';
import requestMiddleware from '../../middleware/request-middleware';

const all: RequestHandler = async (req, res) => {
  const parts = await Part.find();
  res.send({ parts });
};

export default requestMiddleware(all);
