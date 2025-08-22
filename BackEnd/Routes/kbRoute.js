const express=require("express")
const {protect,adminonly} =require("../Middleware/authMiddleware");
const { Createkb, getArticle, updateArticle, deleteArticle, } = require("../Controller/kbController");


const router=express.Router();

//Routes
router.post("/",Createkb);
router.get("/",protect,adminonly,getArticle);
router.put("/:id", updateArticle);
router.delete("/:id",protect,adminonly, deleteArticle);


module.exports=router;