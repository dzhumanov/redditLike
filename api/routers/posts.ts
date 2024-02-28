import express from "express";
import Post from "../models/Post";
import auth, { RequestWithUser } from "../middleware/auth";
import { imageUpload } from "../multer";
import mongoose from "mongoose";

const postsRouter = express.Router();

postsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (e) {
    next(e);
  }
});

postsRouter.post(
  "/",
  auth,
  imageUpload.single("image"),
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" });
      }

      const userId = req.user._id;

      const postData = {
        user: userId,
        title: req.body.title,
        description: req.body.description,
        image: req.file ? req.file.filename : null,
        date: new Date(),
      };

      const post = new Post(postData);

      await post.save();
      return res.send(post);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  }
);

export default postsRouter;
