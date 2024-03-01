import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { selectSinglePost, selectSinglePostLoading } from "../postSlice";
import { useEffect } from "react";
import { fetchOnePost } from "../postThunk";
import { apiURL } from "../../../constants";
import Comments from "../../comments/Comments";
import Preloader from "../../../components/UI/Preloader/Preloader";

const FullPost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const post = useAppSelector(selectSinglePost);
  const loading = useAppSelector(selectSinglePostLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOnePost(id));
    }
  }, [id, dispatch]);

  let postImage;

  if (post?.image) {
    postImage = apiURL + "/" + post.image;
  }
  return (
    <>
      <Grid container>
        {loading ? (
          <Preloader loading={loading} />
        ) : (
          <>
            <Grid item>
              <Box
                component="img"
                sx={{
                  display: "block",
                  width: "auto",
                  maxWidth: "100%",
                  maxHeight: "500px",
                  height: "auto",
                }}
                src={postImage}
              />
            </Grid>
            <Grid item sx={{ ml: "30px" }}>
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                {post?.title}
              </Typography>
              <Typography variant="h4">{post?.description}</Typography>
            </Grid>
          </>
        )}
      </Grid>
      <Comments />
    </>
  );
};

export default FullPost;
