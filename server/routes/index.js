const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');

//App routes
router.route('/').get(mainController.homePage);
router.route('/about').get(mainController.about);
router.route('/faqs').get(mainController.faqs);
router.route('/features').get(mainController.features);

module.exports = router;