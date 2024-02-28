import { Box, Grid, Typography } from "@mui/material";
import { Post } from "../../../types";
import { apiURL } from "../../../constants";
import dayjs from "dayjs";

interface Props {
  post: Post;
}

const PostItem: React.FC<Props> = ({ post }) => {
  const dateFormat = dayjs(post.date).format("DD/MM/YYYY HH:mm:ss");
  let cardImage;

  if (post.image) {
    cardImage = apiURL + "/" + post.image;
  }
  return (
    <>
      <Grid
        item
        container
        sm
        md={4}
        lg={3}
        sx={{
          border: "3px solid black",
          mt: "20px",
          "&.MuiGrid-container": {
            padding: 0,
          },
        }}
      >
        <Grid item lg={1}>
          <Box
            component="img"
            sx={{
              display: "block",
              width: "auto",
              maxWidth: "100%",
              maxHeight: "150px",
              height: "auto",
            }}
            src={cardImage}
          />
        </Grid>
        <Grid item lg={8} container direction="column" sx={{ ml: "30px" }}>
          <Grid item container>
            <Typography variant="h5">{dateFormat}</Typography>
            <Typography variant="h5" sx={{ ml: "20px" }}>
              by{" "}
              <span style={{ fontWeight: "bold" }}>{post.user.username}</span>
            </Typography>
          </Grid>
          <Typography variant="h3">{post.title}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default PostItem;
