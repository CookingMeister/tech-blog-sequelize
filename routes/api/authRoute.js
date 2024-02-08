const router = require('express').Router();
const authenticate = require('../config/passport.js');
const logout = require('../config/logout.js');


// Route for handling user login
router.post('/login', authenticate, (err, req, res, next) => {
  if (err) {
    return res.status(500).send({ error: 'Server error' });
  }
});

// Route for handling user logout
router.get('/logout', logout);

module.exports = router;