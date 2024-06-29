const { handelServiceResponse } = require('../response');

const StatusRunning = (apiResponse) => {
  const { data } = apiResponse;
  let statusRunning;
  if (apiResponse.status) {
    const checkStatus = (data1) => data1.show.status === 'Running';
    statusRunning = data.filter(checkStatus);
    return handelServiceResponse(false, 200, 'Data fetched successfully', { data: statusRunning });
  }
  return handelServiceResponse(true, 404, 'error while fetching data', { data: apiResponse.response.data });
};
module.exports = {
  StatusRunning,
};
const StatusEnded = (apiResponse) => {
  const { data } = apiResponse;
  let statusEnded;
  if (apiResponse.status) {
    const checkStatus = (data1) => data1.show.status === 'Ended';
    statusEnded = data.filter(checkStatus);
    return handelServiceResponse(false, 200, 'Data fetched successfully', { data: statusEnded });
  }
  return handelServiceResponse(true, 404, 'error while fetching data', { data: apiResponse.response.data });
};
module.exports = {
  StatusEnded,
};
const StatusDetermined = (apiResponse) => {
  const { data } = apiResponse;
  let statusDetermined;
  if (apiResponse.status) {
    const checkStatus = (data1) => data1.show.status === 'To Be Determined';
    statusDetermined = data.filter(checkStatus);
    return handelServiceResponse(false, 200, 'Data fetched successfully', { data: statusDetermined });
  }
  return handelServiceResponse(true, 404, 'error while fetching data', { data: apiResponse.response.data });
};
module.exports = {
  StatusDetermined,
};
const StatusDevelopment = (apiResponse) => {
  const { data } = apiResponse;
  let statusDevelopment;
  if (apiResponse.status) {
    const checkStatus = (data1) => data1.show.status === 'In Development';
    statusDevelopment = data.filter(checkStatus);
    return handelServiceResponse(false, 200, 'Data fetched successfully', { data: statusDevelopment });
  }
  return handelServiceResponse(true, 404, 'error while fetching data', { data: apiResponse.response.data });
};
module.exports = {
  StatusDevelopment,
};
