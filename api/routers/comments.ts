import express from "express";
import Comment from "../models/Comment";
import auth, { RequestWithUser } from "../middleware/auth";
import mongoose from "mongoose";

const commentsRouter = express.Router();

commentsRouter.get("/:id", async (req, res, next) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId: postId }).populate(
      "user",
      "username"
    );
    return res.send(comments);
  } catch (e) {
    next(e);
  }
});

commentsRouter.post("/", auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const userId = req.user._id;

    const commentData = {
      user: userId,
      postId: req.body.postId,
      message: req.body.message,
    };

    const comment = new Comment(commentData);
    await comment.save();
    return res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next(e);
  }
});

export default commentsRouter;
