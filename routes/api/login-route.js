const router = require('express').Router();
const { authenticate } = require('../../controllers/authController.js');

// Serve the Login page
router.get('/', (req, res) => {
  res.render('login');
});

// Handle Login logic
router.post('/', authenticate );

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;
