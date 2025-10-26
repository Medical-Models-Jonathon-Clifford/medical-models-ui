import { useState } from 'react';
import { Box } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { AddComment } from './AddComment';
import { Comment } from './Comment';
import { CommentNode } from '@mm/types';
import styles from './CommentThread.module.scss';

type CommentState = 'View' | 'Edit';

type CommentThreadProps = {
  sx?: SxProps;
  commentNode: CommentNode;
  replyParent: CommentNode | null;
  onClickReply: (comment: CommentNode) => void;
  onSaveNewReply: (parentComment: CommentNode, replyText: string) => void;
  newCommentText: string;
  onChangeNewComment: (newCommentText: string) => void;
  onClickEdit: (value: string) => void;
  onSaveEdit: (comment: CommentNode, editText: string) => void;
  onDeleteComment: (toDelete: CommentNode) => void;
  onCancelEdit: () => void;
  onCancelReply: () => void;
};

export function CommentThread({
  sx,
  commentNode,
  replyParent,
  newCommentText,
  onClickReply,
  onSaveNewReply,
  onChangeNewComment,
  onClickEdit,
  onSaveEdit,
  onDeleteComment,
  onCancelEdit,
  onCancelReply,
}: CommentThreadProps) {
  const [commentState, setCommentState] = useState<CommentState>('View');

  const handleEdit = () => {
    onClickEdit(commentNode.comment.body);
    setCommentState('Edit');
  };

  const handleSaveEdit = (editText: string) => {
    onSaveEdit(commentNode, editText);
    setCommentState('View');
  };

  const handleReply = () => {
    onClickReply(commentNode);
  };

  const handleSaveNew = (replyText: string) => {
    onSaveNewReply(commentNode, replyText);
  };

  const handleCancelEdit = () => {
    setCommentState('View');
    onCancelEdit();
  };
  const handleCancelNew = () => {
    setCommentState('View');
    onCancelReply();
  };

  return (
    <Box
      data-testid="comment-thread"
      sx={sx}
      className={styles.comment_thread_box}
    >
      <Box className={styles.comment_thread_parent_box}>
        {commentState === 'View' && (
          <Comment
            commentNode={commentNode}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={() => {
              onDeleteComment(commentNode);
            }}
          ></Comment>
        )}
        {commentState == 'Edit' && (
          <AddComment
            newCommentText={newCommentText}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          ></AddComment>
        )}
      </Box>
      {replyParent === commentNode && (
        <Box className={styles.comment_thread_reply_box}>
          <AddComment
            sx={{ marginLeft: '40px' }}
            onSave={handleSaveNew}
            onCancel={handleCancelNew}
          ></AddComment>
        </Box>
      )}
      {commentNode.children.map((replyCommentNode) => {
        return (
          <CommentThread
            key={replyCommentNode.comment.id}
            sx={{ marginLeft: '40px' }}
            commentNode={replyCommentNode}
            replyParent={replyParent}
            onClickReply={onClickReply}
            onSaveNewReply={onSaveNewReply}
            newCommentText={newCommentText}
            onChangeNewComment={onChangeNewComment}
            onClickEdit={onClickEdit}
            onSaveEdit={onSaveEdit}
            onDeleteComment={onDeleteComment}
            onCancelEdit={onCancelEdit}
            onCancelReply={onCancelReply}
          ></CommentThread>
        );
      })}
    </Box>
  );
}
