const router = require('express').Router();
const { logout } = require('../controllers/authController.js');

// Route to render the home page using EJS
router.get('/', (req, res) => {
    res.render('home1');
  });

router.get('/create', (req, res) => {
  res.render('create');
});

// Route for handling user logout
router.post('/logout', logout);

module.exports = router;
