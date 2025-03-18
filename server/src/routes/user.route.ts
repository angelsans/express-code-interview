import express, { Request, Response } from 'express';
import usersSchema from '../schemas/index';
import { parseError, getPaginatedData, getSortedData } from '../helpers/utilities'
import usersData from '../data/index'
import { log } from 'console';
import _ from 'lodash';

const router = express.Router();

/**
 * Function to validate query params
 * @param queryParams query params from request 
 */
const validateQueryParams = (queryParams: object) => { 
  log("query params validation");
  
  const { error } = usersSchema.queryParams.validate(queryParams, {
    allowUnknown: false,
    abortEarly: false,
  });
  if(error) {
    const { details } = error;
    return parseError(
      400, 
      'Invalid query parameters', 
      details.map(e => ({
        message: e.message
      }))
    );
  }
  return null;
}

/**
 * Function to validate the sort query param
 * @param queryParams query params from request 
 */
const validateSortQueryParam = (sort: string) => { 
  log("sort query param validation");

  const [prop] = sort.split(' ');
  
  const { error } = usersSchema.sortQueryParam.validate(prop, {
    allowUnknown: false,
    abortEarly: false,
  });
  if(error) {
    const { details } = error;
    return parseError(
      400, 
      'Invalid sort query param', 
      details.map(e => ({
        message: e.message
      }))
    );
  }
  return null;
}

router.get('/', (req: Request, res: Response) => {
  
  const queryValidation = validateQueryParams(req.query);
  if(queryValidation !== null && queryValidation.errors.length > 0) {
    return res.status(400).send(queryValidation);
  }

  const {sort} = req.query;

  if(sort) {
    const sortValidation = validateSortQueryParam(sort as string);
    if(sortValidation !== null && sortValidation.errors.length > 0) {
      return res.status(400).send(sortValidation);
    }
  }
  
  const usersPaginated = getPaginatedData(usersData, {
    page: req.query.page,
    size: req.query.size,
    sort: (sort as string)
  }, 
  req.baseUrl
  );
  const {results, ...paging} = usersPaginated;
  
  let data = results;
  if(sort){
    data = getSortedData(results, sort as string);
  }

  const response = {
    data,
    paging
  };
  return res.send(response);
});

export default router;