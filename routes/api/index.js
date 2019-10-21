const router = require('express').Router();

const getCrystalRoutes = require('./crystal');
const isAuthenticated = require('./isAuthenticated');
const loginRoutes = require('./login');
const messagesRoutes = require('./messages');
const signUpRoutes = require('./signUp');
const userRoutes = require('./user');
const statsRoutes = require('./stats')

router.use('/', isAuthenticated);
router.use('/getCrystal', getCrystalRoutes);
router.use('/login', loginRoutes);
router.use('/message', messagesRoutes);
router.use('/signup', signUpRoutes);
router.use('/user', userRoutes);
router.use('/stats', statsRoutes);

module.exports = router;
