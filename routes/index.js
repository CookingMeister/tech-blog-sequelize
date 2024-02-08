const express = require('express');
const router = express.Router();

// Route to render the home page using EJS
router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;
