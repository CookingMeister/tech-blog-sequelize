const router = require('express').Router();
const { check } = require('express-validator');
const { getPosts, createPost, updatePost, deletePost } = require('../../controllers/postController');

// Dashboard route
router.get('/', getPosts);

// POST a new post
router.post('/', createPost);

// PUT to update a post by ID
router.put('/', check('id').isInt(), updatePost);

// DELETE a post by ID
router.delete('/:id', check('id').isInt(), deletePost);

module.exports = router;
