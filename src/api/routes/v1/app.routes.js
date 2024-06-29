const express = require('express');
const AllControllers = require('../../controllers');

const router = express.Router();

// ALL GET ROUTES

router.get('/home', AllControllers.HomeController);
router.get('/details/:id', AllControllers.DetailsController);
router.get('/cast/:id', AllControllers.CastController);
router.get('/search', AllControllers.SearchController);
router.get('/load-data/:type', AllControllers.DataLoadController);

module.exports = router;
