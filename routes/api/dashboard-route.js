const router = require('express').Router();
const { User, Post } = require('../../models');
const { check, validationResult } = require('express-validator');

// Dashboard route
router.get('/', async (req, res) => {
  try {
     // If user logged in, include user data
     if (req.session.loggedIn) {
    // Fetch all posts from the database
    const posts = await Post.findAll();
    const userData =
        (await User.findOne({ where: { id: req.session.passport.user } })) || [];
    // Render dashboard with posts array
    res.render(
      'dashboard',
      { posts, userData, }
      );
     } else {
      res.render('login');
     }
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
    if (newPost) {
      console.log("newPost was successful");
    return res.redirect('/api/dashboard');
    }
    return res.status(400).json({ message: 'There was an error posting' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT to update a post
// router.put('/:id', check('id').isInt(), async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const updatedPost = await Post.update(req.body, {
//       where: {
//         id: req.body.id,
//       },
//     });
//     res.status(200).json(updatedPost);
//     return;
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.delete('/:id', check('id').isInt(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
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
    res.status(500).json(error);
  }
});

module.exports = router;
