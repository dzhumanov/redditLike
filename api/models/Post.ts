import { Schema, model, Types } from "mongoose";

const PostSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
