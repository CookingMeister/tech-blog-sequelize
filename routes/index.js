const router = require('express').Router();

// const apiRoutes = require('./api');

// router.use('/api', apiRoutes);

// Route to render the home page using EJS
router.get('/', (req, res) => {
  res.render('home1');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/posts', (req, res) => {
  res.render('post');
});

module.exports = router;
