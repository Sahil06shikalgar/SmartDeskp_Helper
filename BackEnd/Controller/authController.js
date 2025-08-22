const User=require("../Models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const genratetoToken=(userid)=>{
    
    return jwt.sign({ id: userid }, process.env.JWT_TOKEN, {
        expiresIn: "7d",
        
    });
    
};



const registerUser = async (req, res) => {
  try {
    
    const { name, email, password, adminInviteToken, agentInviteToken } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let role = "user";
    
   if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
  role = "admin";
}

 else if (agentInviteToken && agentInviteToken === process.env.AGENT_INVITE_TOKEN) {
      role = "agent";
    }
  

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Correct: use passwordHash
    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      adminInviteToken,
      agentInviteToken,
      role
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genratetoToken(user._id),
      role: user.role,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser=async(req,res)=>{
    try{

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email " });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: genratetoToken(user._id),
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    } 

};

const getUserProfile = async (req, res) => {
     try{

        const user= await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
        
     } catch (error) {
        return res.status(500).json({ message: "Server error" });
    } 
};

const updateUserProfile = async (req, res) => {
    try{
        const user=await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        req.user = updatedUser;
        return res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
           token: genratetoToken(updatedUser._id),
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};



module.exports={
   registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    genratetoToken
}