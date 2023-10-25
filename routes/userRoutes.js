const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const middlware = require('./../middlewares/protect');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Each IP can only send 5 login requests
const loginRateLimiter = rateLimit({ max: 5, windowMS: 1000 * 60 * 5 });

router.post('/signup', authController.signup);
router.post('/login', loginRateLimiter, authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(middlware.protect);

router.patch('/updateMyPassword', authController.updatePassword);
// router.get('/me', userController.getMe, userController.getUser);

router.route('/').post(userController.createUser);

module.exports = router;
