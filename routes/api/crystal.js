const router = require('express').Router();
const crystalController = require('../../controllers/crystalController');

router.route('/').get(crystalController.getCrystals);

module.exports = router;
