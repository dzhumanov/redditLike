import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { selectSinglePost, selectSinglePostLoading } from "../postSlice";
import { useEffect } from "react";
import { fetchOnePost } from "../postThunk";
import { apiURL } from "../../../constants";
import Comments from "../../comments/Comments";
import Preloader from "../../../components/UI/Preloader/Preloader";
import dayjs from "dayjs";

const FullPost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();
  const post = useAppSelector(selectSinglePost);
  const loading = useAppSelector(selectSinglePostLoading);

  const dateFormat = dayjs(post?.date).format("DD/MM/YYYY HH:mm:ss");

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
          <Grid
            container
            direction="column"
            sx={{
              bgcolor: "#fff",
              mb: "20px",
              border: "3px solid black",
              borderRadius: "10px",
              py: "20px",
            }}
          >
            <Grid item>
              <Box
                component="img"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  marginX: "auto",
                }}
                src={postImage}
              />
            </Grid>
            <Grid item sx={{ ml: "30px" }}>
              <Typography variant="h5">
                Author:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {post?.user.username}
                </span>
              </Typography>
              <Typography variant="h5">
                At: <span style={{ fontWeight: "bold" }}>{dateFormat}</span>
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                {post?.title}
              </Typography>
              <Typography variant="h4">{post?.description}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Comments />
    </>
  );
};

export default FullPost;
