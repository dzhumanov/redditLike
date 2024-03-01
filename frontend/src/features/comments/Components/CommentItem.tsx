import { Card, CardContent, Typography } from "@mui/material";
import { Comment } from "../../../types";

interface Props {
    comment: Comment;
}

const CommentItem:React.FC<Props> = ({comment}) => (
    <>
        <Card variant="outlined" style={{ marginBottom: "16px" }}>
            <CardContent>
                <Typography variant="h6" component="h2">
                    {comment.user.username}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {comment.message}
                </Typography>
            </CardContent>
        </Card>
    </>
);

export default CommentItem;
