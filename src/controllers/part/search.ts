import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Part from '../../models/Part';

/**
 * Builds a mongoose query object to search books according to book name and author name.
 * @param name String containing the part name
 */
const buildBookSeachQuery = (name?: string): { [key: string]: any } => {
  const query: any = {};
  if (name) {
    query.name = new RegExp(`.*${name}.*`, 'i');
  }
  // if (author) {
  //   query.author = new RegExp(`.*${author}.*`, 'i');
  // }

  return query;
};

const search: RequestHandler = async (req, res) => {
  const { name } = req.query;

  const query = buildBookSeachQuery(name as string);
  const books = await Part.find(query);
  res.send({ books });
};

export default requestMiddleware(search);
