const monngoose=require('mongoose');

const connectDB = async () => {
  try {
    await monngoose.connect(process.env.MONGO_URL, {});
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
};
}


module.exports=connectDB;