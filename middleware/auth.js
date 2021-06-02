const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  //Check if token exist or not
  if (!token) return res.status(401).json({ error: 'User not logged in' });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Token is not valid' });
  }
};
