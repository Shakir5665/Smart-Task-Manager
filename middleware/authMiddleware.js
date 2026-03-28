import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

export const protectRoute = (req, res, next) => {
  try {
    // 1. Extract token from header (Format should be: "Bearer <token>")
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No valid token provided.' });
    }

    // 2. Separate token from "Bearer"
    const token = authHeader.split(' ')[1];

    // 3. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 4. Attach decoded payload containing the userId to the request
    req.user = decoded;
    
    // 5. Allow access to the next controller/middleware
    next();
  } catch (error) {
    res.status(401).json({ message: 'Access denied. Invalid or expired token.' });
  }
};
