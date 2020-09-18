const express = require('express');
const jobController = require('../controllers/jobController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(jobController.getAllJobs);

router
  .route('/:id')
  .get(jobController.getJob)
  .delete(jobController.deleteJob);

router
  .route('/postjob/:empID')
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    jobController.createJob
  );

module.exports = router;
