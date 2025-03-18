import { log } from 'console';
import _ from 'lodash';

export const parseError = (code: number, message: string, errorDetails: object[]) => {
    const errorObj = {
      code: code,
      message,
      errors: errorDetails,
    };
  
    log("An error ocurred", errorObj);
    return errorObj;
  }
  
/**
 * Function to paginate data data using the page and size params. If sort param is present
 * @param data 
 * @param paging 
 * @param baseUrl
 * @returns 
 */
type Paging = {
  page: any;
  size: any;
  sort?: string;
}
export const getPaginatedData = (data: Array<object>, paging: Paging, baseUrl: string)  => {
  const pg = paging.page ? parseInt(paging.page as string) : 1;
  const pgSize = paging.size ? parseInt(paging.size as string) : 50;
    
  const offset = (pg - 1) * pgSize;
  const pagedUsers = _.drop(data, offset).slice(0, pgSize);
  const total_pages = Math.ceil(data.length / pgSize);
  const totalResults = data.length;

  log("page", pg);
  log("pgSize", pgSize);
  log("offset", offset);
  log("total_pages", total_pages);
  log("sort", paging.sort);

  let previous;
  let next;
  let sortBy='';

  if(paging.sort){
    sortBy = `&sort=${encodeURI(paging.sort)}`;
  }

  if(totalResults !== pgSize){
    if(pg !== 1 && pg <= total_pages) {
      const previousPage = pg -1;
      previous = `${baseUrl}?page=${previousPage}&size=${pgSize}${sortBy}`
    }
    if(offset + 1 < total_pages){
      const nextPage = pg +1;
      next = `${baseUrl}?page=${nextPage}&size=${pgSize}${sortBy}`
    }
  }

  return {
    previous,
    next,
    totalResults,
    results: pagedUsers,
  };
}


/**
 * Function to sort data using the sort param
 * @param data 
 * @param sort 
 * @returns 
 */
export const getSortedData = (data: Array<object>, sort: string) => {
  const [prop, order] = sort.split(' ');
  const sortString = order === 'desc' ? 'desc': 'asc'; //sort asc by default
  let sortedData = 
    _.orderBy(data, [prop],
    [sortString]);

  return sortedData;
}