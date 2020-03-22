const express = require('express');
const router = express.Router();
const checkAuth = require('../middleare/check-auth');
const adsController = require('../controllers/ads');

router.get('/',checkAuth,adsController.adsGetAll);

router.post('/addAnAd',checkAuth,adsController.addAds);

module.exports = router;