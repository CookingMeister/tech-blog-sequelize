const router = require('express').Router();
const { User } = require('../../models');
const { getUser, deleteUser } = require('../../controllers/userController.js');

// Get user profile
router.get('/', getUser);

// Update user profile
router.post('/:id', async (req, res) => {
  //  Authentication middleware
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const id = req.params.id;
  const { username } = req.body;

  try {
    const user = await User.findByPk(id);
    // Update only the username
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    } else {
      user.username = username;
    }

    await User.update({ username }, { where: { id } });
    console.log('User updated');
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete user profile
router.delete('/:id', deleteUser);

module.exports = router;
