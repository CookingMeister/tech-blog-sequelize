const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/register', (req, res) => {
  res.render('register');
});

// Register a new user
router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { username } });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(
        password,
        saltRounds,
        async (err, hash) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          return hash;
        }
      );
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
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
  