const router = require('express').Router();
const { User } = require('../../models');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// Get user profile
router.get('/profile', (req, res) => {
  // Authentication middleware in place
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Send user data
  const { id, username } = req.user;
  res.json({ id, username });
});

// Update user profile
router.put('/profile', async (req, res) => {
  // Authentication middleware in place
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { username } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update only the fields that were sent in the request
    if (username) {
      user.username = username;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
