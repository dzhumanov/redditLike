import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PostForm from "./Components/PostForm";
import { PostMutation } from "../../types";
import { createPost } from "./postThunk";
import { Typography } from "@mui/material";
import { selectUser } from "../users/usersSlice";
import { useEffect } from "react";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const onFormSubmit = async (PostMutation: PostMutation) => {
    try {
      await dispatch(createPost(PostMutation)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Typography variant="h4">Create new post</Typography>
      <PostForm onSubmit={onFormSubmit} />
    </>
  );
};

export default CreatePost;
