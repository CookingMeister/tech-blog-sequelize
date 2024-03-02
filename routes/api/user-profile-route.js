const router = require('express').Router();
const { getUser, updateUser, deleteUser } = require('../../controllers/userController.js');

// Get user profile
router.get('/', getUser);

// Update user profile
router.post('/:id', updateUser);

// Delete user profile
router.delete('/:id', deleteUser);

module.exports = router;
