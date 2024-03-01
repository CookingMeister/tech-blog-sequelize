const router = require('express').Router();
const { authenticate } = require('../../controllers/authController.js');

// Serve the Login page
router.get('/', (req, res) => {
  res.render('login');
});

// Handle Login logic
router.post('/', authenticate );

module.exports = router;
