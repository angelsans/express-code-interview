import joi from 'joi';

// Schema for query params

const queryParams = joi.object({
  page: joi.number().integer().min(1).optional(),
  size: joi.number().integer().min(1).max(100).optional(),
  sort: joi.string().optional()
});

const sortQueryParam = joi.valid('id', 'name').required();

export default {
    queryParams,
    sortQueryParam
};
