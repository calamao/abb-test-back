import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Part from '../../models/Part';

export const addPartSchema = Joi.object().keys({
  name: Joi.string().required(),
  features: Joi.any()
});

const add: RequestHandler = async (req, res) => {
  const { name, features } = req.body;

  const book = new Part({ name, features });
  await book.save();

  res.send({
    message: 'Saved',
    book: book.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addPartSchema } });
