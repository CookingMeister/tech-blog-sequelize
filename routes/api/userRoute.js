const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return hash;
    });
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Log the user in after registration if needed
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(newUser);
      // redirect to home/dashboard???? here??????????????????????????????????????
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get user profile
router.get('/profile', (req, res) => {
  // Authentication middleware in place
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Send user data
  const { id, username, email } = req.user;
  res.json({ id, username, email });
});

// Update user profile
router.put('/profile', async (req, res) => {
  // Authentication middleware in place
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { username, email } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update only the fields that were sent in the request
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
