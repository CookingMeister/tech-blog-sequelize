const { Post, User } = require('../models');
const { validationResult } = require('express-validator');

//  Get all Posts logic
const getPosts = async (req, res) => {
  try {
    // If user logged in, include user data
    if (req.session.loggedIn) {
      // Fetch all posts from the database
      const posts = await Post.findAll({
        where: {
          userId: req.session.passport.user,
        },
      });
      const userData =
        (await User.findOne({ where: { id: req.session.passport.user } })) ||
        [];
      // Render dashboard with posts array
      res.render('dashboard', { posts, userData });
    } else {
      res.status(401).redirect('login');
    }
  } catch (error) {
    // Handle errors
    console.error('Error fetching posts:', error);
    res.status(500).redirect('login');
  }
}

//  Create Post logic
const createPost = async (req, res) => {
  //  Is user authenticated to Post
  if (req.isAuthenticated) {
    try {
      const newPost = await Post.create(req.body);
      if (newPost) {
        return res.redirect('/api/dashboard');
      }
      return res.status(400).json({ message: 'There was an error posting' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  return res.status(401).json({error: 'User is not authorized'})
}

//  Update Post logic
const updatePost = async (req, res) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {   // Update Post by ID
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    console.log('Updated post:', updatedPost);
    res.status(200).json(updatedPost);
    return;
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//  Delete Post by ID logic
const deletePost = async (req, res) => {
  // Validate the request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //  Is user authenticated to Delete
  if (req.isAuthenticated) {
    try {   // Delete Post by ID
      const { rowsDeleted } = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Post successfully deleted!' });
      return;
    } catch (error) {
      // Handle errors
      console.log(error);
      res.status(500).json(error);
    }
  }
  return res.status(401).json({error: 'User is not authorized'})
}

module.exports = { getPosts, createPost, updatePost, deletePost };
