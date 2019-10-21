const router = require('express').Router();
const statsController = require('../../controllers/statsController');

router.route('/').get(statsController.getStats);
router.route('/').post(statsController.postNewStats);

module.exports = router;