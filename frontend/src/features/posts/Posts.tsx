import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPosts, selectPostsLoading } from "./postSlice";
import { useEffect } from "react";
import { fetchPosts } from "./postThunk";
import PostItem from "./Components/PostItem";
import Preloader from "../../components/UI/Preloader/Preloader";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3">All posts</Typography>
      {loading ? (
        <Preloader loading={loading} />
      ) : (
        <Grid item container direction="column" spacing={2}>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
