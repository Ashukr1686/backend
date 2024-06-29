const logger = require('../../config/logger');
const { handelServiceResponse } = require('../utils/response');
const { serviceData } = require('../utils/errorHandlingService');

const db = require('../../config/mongoose');

// eslint-disable-next-line no-unused-vars, consistent-return
const homeService = async (req) => {
  const { type } = req.query;
  console.log(type);
  try {
    if (type === 'home') {
      const data = await db.useDb('anime_countdown').collection('today').find({}).toArray();
      return serviceData(data);
    }

    if (type === 'upcomming') {
      const data = await db.useDb('anime_countdown').collection('tomorrow').find({}).toArray();
      return serviceData(data);
    }

    if (type === 'nextWeek') {
      const data = await db.useDb('anime_countdown').collection('weekly').find({}).toArray();
      return serviceData(data);
    }
    if (type === 'recentlyAired') {
      const data = await db.useDb('anime_countdown').collection('yesterday').find({}).toArray();
      return serviceData(data);
    }
    if (type === 'trending') {
      const data = await db.useDb('anime_countdown').collection('trending').find({}).toArray();
      return serviceData(data);
    }
    if (type === 'thisWeek') {
      const data = await db.useDb('anime_countdown').collection('thisWeek').find({}).toArray();
      return serviceData(data);
    }
  } catch (error) {
    logger.error('===OR IN homeService ===', error);
    return handelServiceResponse(true, 500, 'unexpected error at service level', null);
  }
};

module.exports = {
  homeService,
};
