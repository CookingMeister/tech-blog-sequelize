const router = require('express').Router();
const { logout } = require('../../controllers/authController.js');

// Handle the Logout
router.get('/', logout );

module.exports = router;