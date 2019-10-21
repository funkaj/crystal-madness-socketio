const router = require('express').Router();
const loginController = require('../../controllers/loginController');

// LOGIN ROUTE
router.route('/').post(loginController.login);

module.exports = router;
