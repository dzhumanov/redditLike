import mongoose, { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Comment = model("Comment", CommentSchema);

export default Comment;
