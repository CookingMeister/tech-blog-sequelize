const router = require('express').Router();
const { comment } = require('../../controllers/commentController');

// Post Comment Route
router.post('/', comment );

module.exports = router;