const router = require('express').Router();
const { Post } = require('./../models');

// Route to render the home page using EJS
router.get('/', async (req, res) => {
  try {
  // Fetch all posts from the database
  const posts =  await Post.findAll();
  // Render dashboard with posts array
  res.render('home1', { posts, user: req.user });
    // res.render('home1');
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
  });

module.exports = router;
