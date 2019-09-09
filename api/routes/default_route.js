const express = require('express');
const router = express.Router();
const d_controller = require('../controller/default_controller')

router.get('',d_controller.getDefaultRoute);

module.exports = router;