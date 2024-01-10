const authMiddleware = (req, res, next) => {
    // Check if the user is authenticated
    const authenticated = req.session && req.session.authenticated;
  
    if (authenticated) {
      // If authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // If not authenticated, redirect to the login page or send an unauthorized response
      res.redirect('/login'); // Redirect to your login page
      // Or you can send an unauthorized response
      // res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  module.exports = authMiddleware;