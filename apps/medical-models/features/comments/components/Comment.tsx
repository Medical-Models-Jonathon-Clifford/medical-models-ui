import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { CommentNode } from '../utils/comments';
import { formatTimeSince } from '../../../utils/date-adapters';
import { ProfileIcon } from '../../../components/profile-icon/ProfileIcon';
import styles from './Comment.module.scss';

type CommentProps = {
  commentNode: CommentNode;
  onReply: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function Comment({
  commentNode,
  onReply,
  onEdit,
  onDelete,
}: CommentProps) {
  return (
    <>
      <Box className={styles.comment_box}>
        <Avatar src={commentNode.comment.profilePicturePath}>
          <ProfileIcon size={'100%'} />
        </Avatar>
        <Box className={styles.comment_info_box}>
          <Box>
            <Link variant="h4">{commentNode.comment.fullName}</Link>
            <Typography variant="caption">
              {formatTimeSince(commentNode.comment.modifiedDate)}
            </Typography>
          </Box>
          <Typography variant="body1" data-testid="comment-body">
            {commentNode.comment.body}
          </Typography>
          <Box className={styles.button_box}>
            <Button variant={'link'} onClick={onReply}>
              Reply
            </Button>
            <Typography className={styles.button_separator}>•</Typography>
            <Button variant={'link'} onClick={onEdit}>
              Edit
            </Button>
            <Typography className={styles.button_separator}>•</Typography>
            <Button variant={'link'} onClick={onDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
