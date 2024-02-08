const router = require('express').Router();
const postRoutes = require('./postRoute');
const userRoutes = require('./userRoute');
const authRoutes = require('./authRoute');

router.use('/posts', postRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;