const express = require("express");
const jobController = require("../controllers/jobController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(jobController.getAllJobs);

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("employer"),
    jobController.createJob
  );

router.route("/:id").get(jobController.getJob).delete(jobController.deleteJob);

module.exports = router;
