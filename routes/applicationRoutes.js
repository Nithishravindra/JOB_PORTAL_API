const express = require('express');
const applicationController = require('../controllers/applicationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.use(authController.restrictTo('user'));

router.route('/').get(applicationController.getAllApplications);

router
  .route('/:id')
  .get(applicationController.getApplication)
  .post(applicationController.createApplication)
  .delete(applicationController.deleteApplication);

module.exports = router;
