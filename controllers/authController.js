const passport = require('../config/passport.js');
// const localStrategy = require('passport-local').Strategy;

// const authenticate = passport.authenticate('local', {
//   successRedirect: '/home1', // Redirect to home on successful login
//   failureRedirect: '/api/login', // Redirect back to login page on failed login
//   failureFlash: true, // Enable flashing of error messages
// })

const authenticate = (req, res, next) => {
  passport.authenticate('local', {
      successRedirect: '/home1',
      failureRedirect: '/api/login',
      failureFlash: true // Enable flash messages for failed login
  })(req, res, next);
}

const logout = (req, res) => {
  req.logout(); // Provided by Passport to clear login session
  res.redirect('/');
}


module.exports = { authenticate, logout };