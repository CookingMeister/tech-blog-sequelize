const router = require('express').Router();
const passport = require('../../config/passport.js');
const { User } = require('../../models');
const { authenticate } = require('../../controllers/authController.js'); // link works
// const logout = require('../../controllers/authController.js');

router.get('/', (req, res) => {
  res.render('login');
});
// works, needs password validation added
// router.post('/', (req, res) => {
//   console.log('login route clicked');
//   User.findOne({
//     where: {
//       username: req.body.username,
//     },
//   })
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(400).json({ message: 'No user with that username!' });
//         return;
//       }
//       req.session.save(() => {
//         req.session.id = dbUserData.id;
//         req.session.username = dbUserData.username;
//         req.session.loggedIn = true;
//         res.json({ user: dbUserData, message: 'You are now logged in!' });
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: 'An error occurred', error: err });
//     });
// });
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home1',
    failureRedirect: '/api/login',
    failureFlash: true, // Enable flash messages for failed login
  })(req, res, () => {
    // If authentication succeeds, this function will be called
    // req.user contains the authenticated user
    req.session.save((err) => {
      if (err) {
        res.status(500).json({ message: 'There was an error logging in' });
      } else {
        req.session.id = req.user.id;
        req.session.username = req.user.username;
        req.session.loggedIn = true;
        res.json({ user: req.user, message: 'You are now logged in!' });
      }
    });
  });
});


// router.post('/', (req, res, next) => {
//   passport.authenticate('local', {
//       successRedirect: '/home1',
//       failureRedirect: '/api/login',
//       failureFlash: true // Enable flash messages for failed login
//   })(req, res, next),
//   req.session.save((err) => {
//     if (err) {
//       res.status(500).json({ message: 'There was an error logging in' });
//     } else {
//       req.session.id = req.user.id;
//       req.session.username = req.user.username;
//       req.session.loggedIn = true;
//       console.log('logged in works');

//       res.json({ user: req.user, message: 'You are now logged in!' });
//     }
//   });
// });

module.exports = router;
