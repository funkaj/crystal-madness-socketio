const router = require('express').Router();
const userController = require('../../controllers/userController');

// Any route with isAuthenticated is protected and you need a valid token to access
router.route('/').get(userController.isAuthenticated);

module.exports = router;
