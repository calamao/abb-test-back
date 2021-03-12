import { RequestHandler } from 'express';
import Part from '../../models/Part';
import requestMiddleware from '../../middleware/request-middleware';

const deleteAll: RequestHandler = async (req, res) => {
  const parts = await Part.deleteMany();
  res.send({ elementsDeleted: parts.deletedCount });
};

export default requestMiddleware(deleteAll);
