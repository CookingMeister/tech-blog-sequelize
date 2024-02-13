const withAuth = (req, res, next) => {
  // If user not logged in to session, redirect to login route
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
