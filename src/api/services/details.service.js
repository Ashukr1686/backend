const logger = require('../../config/logger');
const { externalGetCall } = require('../utils/AxiosHelper');
const { baseUrl, apiRoutes } = require('../utils/constants');
const { handelServiceResponse } = require('../utils/response');

const DetailService = async (req) => {
  const { id } = req.params;
  try {
    if (id !== 'null') {
      const apiResponse = await externalGetCall(`${baseUrl + apiRoutes.shows}/${id}`);
      if (apiResponse.status) {
        return handelServiceResponse(false, 200, 'Data fetched successfully', { data: apiResponse.data });
      }
      return handelServiceResponse(true, 404, 'error while fetching data', { data: apiResponse.response.data });
    }

    return handelServiceResponse(true, 400, 'error while fetching data error in id', { data: null });
  } catch (error) {
    logger.error('===OR IN homeService ===', error);
    return handelServiceResponse(true, 500, 'unexpected error at service level', null);
  }
};

const CastService = async (req) => {
  const { id } = req.params;
  try {
    if (id !== 'null') {
      const apiResponse = await externalGetCall(`${baseUrl + apiRoutes.shows}/${id}/cast`);
      if (apiResponse.status) {
        return handelServiceResponse(false, 200, 'Data fetched successfully', { data: apiResponse.data });
      }
      return handelServiceResponse(true, 404, 'error while fetching data', { data: apiResponse.response.data });
    }
    return handelServiceResponse(true, 400, 'error while fetching data error in id', { data: null });
  } catch (error) {
    logger.error('===OR IN homeService ===', error);
    return handelServiceResponse(true, 500, 'unexpected error at service level', null);
  }
};
const SearchService = async (req) => {
  const { query } = req.query;
  try {
    if (query !== 'null') {
      const apiResponse = await externalGetCall(`${baseUrl + apiRoutes.search}?q=${query}`);
      if (apiResponse.status) {
        return handelServiceResponse(false, 200, 'Data fetched successfully', { data: apiResponse.data });
      }
      return handelServiceResponse(true, 404, 'error while fetching data', { data: apiResponse.response.data });
    }
    return handelServiceResponse(true, 400, 'error while fetching data error in id', { data: null });
  } catch (error) {
    logger.error('===OR IN homeService ===', error);
    return handelServiceResponse(true, 500, 'unexpected error at service level', null);
  }
};
module.exports = {
  DetailService,
  CastService,
  SearchService,
};
