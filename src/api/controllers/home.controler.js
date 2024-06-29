const logger = require('../../config/logger');
const { homeService } = require('../services/home.service');
const { responseBuilder } = require('../utils/response');
const { DetailService, CastService, SearchService } = require('../services/details.service');
const { loadDataService, loadWeeklyData } = require('../services/loadData.service');

const HomeController = async (req, res) => {
  try {
    const response = await homeService(req);
    return responseBuilder(res, response.status, response.data);
  } catch (error) {
    logger.error('=== ERROR IN HomeController ====', error);
    return res.status(500).send({
      message: 'unexpected error at controller level',
      error,
    });
  }
};

const DetailsController = async (req, res) => {
  try {
    const response = await DetailService(req);
    return responseBuilder(res, response.status, response.data);
  } catch (error) {
    logger.error('=== ERROR IN HomeController ====', error);
    return res.status(500).send({
      message: 'unexpected error at controller level',
      error,
    });
  }
};

const CastController = async (req, res) => {
  try {
    const response = await CastService(req);
    return responseBuilder(res, response.status, response.data);
  } catch (error) {
    logger.error('=== ERROR IN HomeController ====', error);
    return res.status(500).send({
      message: 'unexpected error at controller level',
      error,
    });
  }
};
const SearchController = async (req, res) => {
  try {
    const response = await SearchService(req);
    return responseBuilder(res, response.status, response.data);
  } catch (error) {
    logger.error('=== ERROR IN HomeController ====', error);
    return res.status(500).send({
      message: 'unexpected error at controller level',
      error,
    });
  }
};

const DataLoadController = async (req, res) => {
  try {
    const type = req.params.type;
    if(type === 'all') {
      await loadDataService();
    }else if(type === 'weekly') {
      await loadWeeklyData();
    }
   
    return responseBuilder(res, 200, { message: 'done' });
  } catch (error) {
    logger.error('=== ERROR IN DataLoadController ====', error);
    return res.status(500).send({
      message: 'unexpected error at controller level',
      error,
    });
  }
};
module.exports = {
  HomeController,
  DetailsController,
  CastController,
  SearchController,
  DataLoadController,
};
