const Article=require("../Models/Article")

const Createkb=async (req,res)=>{
     try {
    const { title, body, tags, status } = req.body;

    const article = await Article.create({
      title,body,tags,status, updatedAt: new Date(),
    });

    res.status(201).json(article);
  } catch (error) {
    console.error("KB Create Error:", error);
    res.status(500).json({ message: "Server error" });
  }

};

const getArticle=async (req,res)=>{
   try {
    const articles = await Article.find();
    return res.status(200).json(articles);
  } catch (error) {
    console.error("Get Articles Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateArticle=async (req,res)=>{
try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Update Article Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteArticle=async (req,res)=>{
    try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article removed" });
  } catch (error) {
    console.error("Delete Article Error:", error);
    res.status(500).json({ message: "Server error" });
  }

}

module.exports={
    Createkb,
    getArticle,
    updateArticle,
    deleteArticle

}