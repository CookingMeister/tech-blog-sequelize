const router = require('express').Router();
const { Post, User, Comment } = require('./../models');

// Render the home page using EJS
router.get('/', async (req, res) => {
  try {
    // Format date
    const formattedDate = () => {
      const date = new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return month + '/' + day + '/' + year;
    };

    // Fetch all posts from the database
    const posts = await Post.findAll();
    const users = await User.findAll();
    const comments = await Comment.findAll();

    // Render dashboard with posts array
    res.render('home', {
      posts,
      users,
      user: req.user,
      comments,
      date: formattedDate,
    });
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
