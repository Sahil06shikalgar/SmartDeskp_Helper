const jwt=require("jsonwebtoken");
const User = require("../Models/user");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    } 
};

 const adminonly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};

const agentOnly = (req, res, next) => {
  if (req.user && req.user.role === "agent") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Agents only" });
  }
};
module.exports = { protect, adminonly, agentOnly};