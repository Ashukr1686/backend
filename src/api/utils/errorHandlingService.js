const { handelServiceResponse } = require('./response');

const apiCallHandling = (apiResponse) => {
  if (apiResponse.status) {
    return handelServiceResponse(false, 200, 'Data fetched successfully', { data: apiResponse.data });
  }
  return handelServiceResponse(true, 404, 'error while fetching data', { data: apiResponse.response.data });
};

const serviceData = (data) => handelServiceResponse(false, 200, 'Data fetched successfully', { data });
module.exports = {
  apiCallHandling,
  serviceData,
};
