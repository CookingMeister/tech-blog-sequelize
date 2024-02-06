const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new post
router.post('/posts', async (req, res) => {
  const { title, content } = req.body;

  try {
    const user = req.user; // authentication in place

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const post = await Post.create({
      title,
      content,
      UserId: user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific post by ID
router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId, {
      include: [{ model: User, attributes: ['username'] }],
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a post by ID
router.put('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Only authenticated post owner can update
    if (post.UserId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await post.update({ title, content });

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a post by ID
router.delete('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Only authenticated post owner can delete
    if (post.UserId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await post.destroy();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
