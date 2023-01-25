import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../model/Post.js";

const router = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//CREATE POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({ name, prompt, photo: photoUrl.url });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Could not create post due to: ${error}`,
      });
  }
});

//GET ALL POSTS
router.route("/post").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//DELETE POST
router.route("/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);

    res.status(200).json({ success: true, data: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
