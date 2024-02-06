const passport = require('passport');

// Route for handling user login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to dashboard on successful login
    failureRedirect: '/login', // Redirect back to login page on failed login
    failureFlash: true, // Enable flashing of error messages
  }),
  (err, req, res, next) => {
    if (err) {
      return res.status(500).send({ error: 'Server error' });
    }
  }
);

// Route for handling user logout
router.get('/logout', (req, res) => {
  req.logout(); // Provided by Passport to clear login session
  res.redirect('/');
});

module.exports = router;