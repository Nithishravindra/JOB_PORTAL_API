const express = require('express');
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(applicationController.getAllApplications);

router
  .route('/:id')
  .get(applicationController.getApplication)
  .delete(applicationController.deleteApplication);

router
  .route('/addApplication/:userID/:jobID')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    applicationController.createApplication
  );

module.exports = router;
