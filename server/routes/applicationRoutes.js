const express = require("express");
const applicationController = require("../controllers/applicationController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.use(authController.restrictTo("user"));

router.route("/").get(applicationController.getAllApplications);

router.route("/:id").post(applicationController.createApplication);
//   .get(bookingController.getBooking)
//   .patch(bookingController.updateBooking)
//   .delete(bookingController.deleteBooking);

module.exports = router;
