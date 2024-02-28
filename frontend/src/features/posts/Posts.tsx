import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPosts } from "./postSlice";
import { useEffect } from "react";
import { fetchPosts } from "./postThunk";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3">All posts</Typography>
      <Grid item container spacing={2}>
        {posts.map((post) => (
          <Grid item sm md={4} lg={3} key={post._id}>
            <Typography>{post.title}</Typography>
            <Typography>{post.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
