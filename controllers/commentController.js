const { Comment } = require('../models');

// Create Comment logic
const comment = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const newComment = await Comment.create({
      postId: req.body.postId,
      comment: req.body.comment,
      userId: req.body.userId,
    });
    if (newComment) {
      console.log('newComment was successful');
      return res.redirect('/api/dashboard');
    }
    return res.status(400).json({ message: 'There was an error posting' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { comment };
