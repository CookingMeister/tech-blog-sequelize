const router = require("express").Router();
const { Post } = require('../../models');

// Dashboard route
router.get('/', async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.findAll();
        // Render dashboard with posts array
        res.render('dashboard', { posts });
    } catch (error) {
        // Handle errors
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST a new post
router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create(req.body);
      res.json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



module.exports = router;
