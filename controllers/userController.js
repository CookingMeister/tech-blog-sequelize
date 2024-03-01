const { User } = require('../models');

// Get User Profile logic
const getUser = async (req, res) => {
    // Authentication middleware
    if (!req.isAuthenticated()) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
   try {
     // If user logged in, include user data
     if (req.session.loggedIn) {
       // Fetch all posts from the database
       const user =
         (await User.findOne({ where: { id: req.session.passport.user } })) ||
         [];
       // Render dashboard with posts array
       res.render('user', { user });
     }
   } catch (error) {
     console.error('Error fetching users:', error);
     res.status(500).json({ error: 'Error fetching users' });
   }
 }

 // Delete User Profile logic
 const deleteUser = async (req, res) => {
    // Authentication middleware
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const id = req.params.id;
    try {
      // Find the user by ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Check if the user is the same as the user being deleted
      if (user.id !== req.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      await user.destroy();
      res.status(204).json({ message: 'User deleted' });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = { getUser, deleteUser };