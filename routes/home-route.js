const router = require('express').Router();

// Route to render the home page using EJS
router.get('/', (req, res) => {
    res.render('home1');
  });

module.exports = router;
