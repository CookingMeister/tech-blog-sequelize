const router = require('express').Router();
const passport = require('../../config/passport.js');
// const { User } = require('../../models');
// const { authenticate } = require('../../controllers/authController.js'); // link works
// const logout = require('../../controllers/authController.js');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res, next) => {
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
              res.redirect('/api/dashboard');
          });
        });
  })(req, res, next);
});

module.exports = router;
