const router = require('express').Router();


// Route to render the home page using EJS
router.get('/', (req, res) => {
    res.render('home1');
  });

// router.get('/register', (req, res) => {
//   res.render('register');
// });

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/create', (req, res) => {
  res.render('create');
});


module.exports = router;
