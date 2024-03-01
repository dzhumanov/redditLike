import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Post = model("Post", PostSchema);

export default Post;
