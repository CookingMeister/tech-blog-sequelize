const router = require('express').Router();
const userRoutes = require('./user-profile-route');
const registerRoutes = require('./register-route');
const loginRoutes = require('./login-route');
const logoutRoutes = require('./logout-route');
const dashboardRoutes = require('./dashboard-route');
const commentRoutes = require('./comment-route');

// Endpoint Routes to Use
router.use('/register', registerRoutes);
router.use('/user', userRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/comment', commentRoutes);

module.exports = router;