const router = require('express').Router();
const postRoutes = require('./post-route');
const userRoutes = require('./user-profile-route');
const registerRoutes = require('./register-route');
const loginRoutes = require('./login-route');

router.use('/register', registerRoutes);
router.use('/posts', postRoutes);
router.use('/user', userRoutes);
router.use('/login', loginRoutes);

module.exports = router;