const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../Controller/authController');
const { protect } = require('../Middleware/authMiddleware');




const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);
router.put("/profile",protect,updateUserProfile);


module.exports=router;