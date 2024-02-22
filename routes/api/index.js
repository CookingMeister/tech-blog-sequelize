const router = require('express').Router();
const postRoutes = require('./post-route');
const userRoutes = require('./user-profile-route');
const registerRoutes = require('./register-route');
const loginRoutes = require('./login-route');
const logoutRoutes = require('./logout-route');
const dashboardRoutes = require('./dashboard-route');

router.use('/register', registerRoutes);
router.use('/posts', postRoutes);
router.use('/user', userRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;