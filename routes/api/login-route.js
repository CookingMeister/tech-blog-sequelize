const router = require('express').Router();
const { User } = require('../../models');
const { authenticate } = require('../../controllers/authController.js'); // link works
// const logout = require('../../controllers/authController.js');

router.get('/', (req, res) => {
  res.render('login');
});

// Route for handling user login
// router.post('/', authenticate, (err, req, res, next) => {
//   console.log(req.user);
//   console.log("Post request clicked")
//   if (err) {
//     return res.status(500).send({ error: 'Server error' });
//   }
// });


module.exports = router;