const { handelServiceResponse } = require('../response');

const TypeScripted = (apiResponse) => {
  const { data } = apiResponse;
  let typeScripted;
  if (apiResponse.status) {
    const checkStatus = (data1) => data1.show.type === 'Scripted';
    typeScripted = data.filter(checkStatus);
    return handelServiceResponse(false, 200, 'Data fetched successfully', { data: typeScripted });
  }
  return handelServiceResponse(true, 404, 'error while fetching data', { data: apiResponse.response.data });
};
module.exports = {
  TypeScripted,
};
