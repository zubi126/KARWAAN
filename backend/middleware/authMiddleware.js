// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {

//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: "Access denied" });
//   }

//   try {

//     const verified = jwt.verify(token, process.env.JWT_SECRET);

//     req.admin = verified;

//     next();

//   } catch (error) {

//     res.status(400).json({ message: "Invalid token" });

//   }

// };

// export default authMiddleware;


import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  try {

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = verified;

    next();

  } catch (error) {

    res.status(401).json({ message: "Invalid token" });

  }

};

export default authMiddleware;