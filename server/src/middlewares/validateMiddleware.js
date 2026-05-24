import { ApiError } from '../utils/apiError.js';
import { sanitizeObject } from '../utils/sanitize.js';

export const validate = (schema) => (req, res, next) => {
  const parsed = schema.safeParse({
    body: sanitizeObject(req.body),
    params: req.params,
    query: req.query
  });

  if (!parsed.success) {
    throw new ApiError(400, 'Validation failed', parsed.error.flatten());
  }

  req.body = parsed.data.body || req.body;
  req.params = parsed.data.params || req.params;
  req.query = parsed.data.query || req.query;
  next();
};
