import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {

  // Get token from request headers
  const token = req.headers.authorization;

  console.log("Authorization:", req.headers.authorization);

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      message: "Authorization token is missing.",
    });
  }

  // Remove "Bearer "
  const authToken = token.split(" ")[1];
  console.log("AuthToken:", authToken);

  try {

    // Verify JWT
    const decodedToken = jwt.verify(
      authToken,
      process.env.TOKEN_SECRET
    );

    // Save decoded payload
    req.payload = decodedToken;

    // Continue request
    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      message: "Invalid or expired token.",
    });

  }
};

export default isAuthenticated;