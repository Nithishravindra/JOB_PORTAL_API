const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.post('/resetPassword', authController.resetPassword);

router.route('/').get(userController.getAllUsers);
router
  .route('/getOnlyEmployers')
  .get(userController.getOnlyEmployers);

router.route('/getOnlyUsers').get(userController.getOnlyUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
