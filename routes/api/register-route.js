const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('register');
});

// Register a new user
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { username } });

    existingUser
      ? res.status(400).json({ error: 'Username already in use' })
      : bcrypt.hash(password, saltRounds).then((hashedPassword) => {
          User.create({
            username,
            password: hashedPassword,
          }).then((newUser) => {
            req.session.loggedIn = true;
            req.login(newUser, (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
              }
              console.log('New User created and logged in');
              return res.json(newUser);
            });
          });
        });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
