const axios = require('axios');

const externalGetCall = async (url) => {
  const response = await axios.get(url);
  return response;
};
module.exports = {
  externalGetCall,
};
