const router = require('express').Router();
const signUpController = require('../../controllers/signUpController');

// SIGNUP ROUTE
router.route('/').post(signUpController.signUp);

module.exports = router;
