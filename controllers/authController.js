const passport = require('../config/passport.js');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Login authentication using passport-local strategy
const authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    err
      ? res.status(500).json({ message: 'There was an error logging in' })
      : !user
      ? res.status(401).json({ message: 'Incorrect username or password' })
      : req.login(user, (err) => {
          err
            ? res.status(500).json({ message: 'There was an error logging in' })
            : // Save user data in session
              (req.session.id = user.id);
          req.session.username = user.username;
          req.session.loggedIn = true;
          req.session.save((err) => {
            err
              ? res
                  .status(500)
                  .json({ message: 'There was an error logging in' })
              : console.log('User logged in');
              // Once logged in redirect to Dashboard
              res.redirect('/api/dashboard');
          });
        });
  })(req, res, next);
}

// Register a new user
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {   // Look for existing user
    const existingUser = await User.findOne({ where: { username } });
    existingUser
      ? res.status(400).json({ error: 'Username already in use' })
      : bcrypt
          .hash(password, saltRounds)   // Hash password
          .then((hashedPassword) => {
            User.create({               // Create new user
              username,
              password: hashedPassword,
            })
              .then((newUser) => {
                req.login(newUser, (err) => { // Log in new user
                  if (err) {
                    console.error(err);
                    return res
                      .status(500)
                      .json({ error: 'Error logging in new user' });
                  }
                  req.session.userId = newUser.id;
                  req.session.loggedIn = true; // Set session loggedIn to true
                  req.session.save((err) => {
                    if (err) {
                      console.error(err);
                      return res
                        .status(500)
                        .json({ error: 'Error saving user session' });
                    }
                    console.log(newUser, 'New User created and logged in');
                    return res.redirect('/api/dashboard');  
                  });
                });
              })  // Error handling for User.create()
              .catch((error) => {
                console.error(error);
                return res.status(500).json({ error: 'Error creating new user' });
              });
          })  // Error handling for bcrypt.hash()
          .catch((error) => {
            console.error(error);
            return res.status(500).json({ error: 'Error hashing password' });
          });
  } catch (error) { // Error handling for try User.findOne()
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
// Logout logic
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'There was an error logging out' });
    } else {
      res.redirect('/');
    }
  });
}

module.exports = { authenticate, registerUser, logout };