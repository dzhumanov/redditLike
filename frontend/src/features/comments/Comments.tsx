import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectComments } from "./Components/commentsSlice";
import { useEffect } from "react";
import { selectSinglePost } from "../posts/postSlice";
import { createComment, fetchComments } from "./Components/commentsThunk";
import CommentItem from "./Components/CommentItem";
import CommentForm from "./Components/CommentForm";

const Comments = () => {
  const comments = useAppSelector(selectComments);
  const post = useAppSelector(selectSinglePost);
  const dispatch = useAppDispatch();

  const postId = post?._id;

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  const onCommentFormSubmit = async (message: string) => {
    try {
      if (postId) {
        await dispatch(createComment({ message, postId })).unwrap();
        await dispatch(fetchComments(postId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Grid container>
        <CommentForm postId={postId} onSubmit={onCommentFormSubmit} />
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment._id} />
        ))}
      </Grid>
    </>
  );
};

export default Comments;
