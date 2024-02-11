const router = require('express').Router();
const { Post } = require('../../models');
// const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
  res.render('register');
});
// GET all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a specific post by ID
router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new post
router.post('/posts', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a post by ID
router.put('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: postId,
      },
    });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Delete post by ID
router.delete('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: postId,
      },
    });
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(deletedPost);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
