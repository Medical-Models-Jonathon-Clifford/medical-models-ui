import { Avatar, Box, Button, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { CommentNode } from '@mm/types';
import { formatTimeSince } from '@mm/utils';
import { ProfileIcon } from '@mm/components/server';
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
  const { data: session } = useSession();

  return (
    <>
      <Box className={styles.comment_box}>
        {session && (
          <Avatar src={commentNode.comment.profilePicturePath}>
            <ProfileIcon
              givenName={session.user.givenName}
              familyName={session.user.familyName}
              size={'100%'}
            />
          </Avatar>
        )}
        <Box className={styles.comment_info_box}>
          <Box>
            <Typography variant="h4">{commentNode.comment.fullName}</Typography>
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
