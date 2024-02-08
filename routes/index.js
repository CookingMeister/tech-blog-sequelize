const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Route to render the home page using EJS
router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;
