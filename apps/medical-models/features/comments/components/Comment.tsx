import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as React from 'react';
import { CommentNode } from '../utils/comments';
import styles from './Comment.module.scss';
import Box from '@mui/material/Box';
import { formatTimeSince } from '../../../utils/date-adapters';
import { ProfileIcon } from '../../../components/profile-icon/ProfileIcon';
import Link from '@mui/material/Link';

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
        <ProfileIcon />
        <Box className={styles.comment_info_box}>
          <Box>
            <Link variant="h4">John Smith</Link>
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
