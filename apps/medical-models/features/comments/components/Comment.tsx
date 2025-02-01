import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import { CommentNode } from '../utils/comments';

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
      <Typography data-testid="comment-body">
        {commentNode.comment.body}
      </Typography>
      <Typography variant="caption">
        Created: {String(commentNode.comment.createdDate)}, Edited:{' '}
        {commentNode.comment.modifiedDate.toString()}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button onClick={onReply}>Reply</Button>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </Stack>
    </>
  );
}
