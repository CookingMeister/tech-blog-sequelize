const router = require('express').Router();
const { registerUser } = require('../../controllers/authController.js');

// Serve the Register page
router.get('/', (req, res) => {
  res.render('register');
});

// Register a new user
router.post('/', registerUser );

module.exports = router;
