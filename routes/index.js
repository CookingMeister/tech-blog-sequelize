const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-route.js');
 
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Catch-all route for all other requests
router.use('*', (req, res) => {
    res.status(404).render('404');
  });

module.exports = router;
