import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { AddComment } from './AddComment';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Comment } from './Comment';
import { CommentNode } from '../utils/comments';

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

  return (
    <Box data-testid="comment-thread" sx={sx}>
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
        ></AddComment>
      )}
      {replyParent === commentNode && (
        <AddComment
          sx={{ marginLeft: '20px' }}
          onSave={handleSaveNew}
        ></AddComment>
      )}
      {commentNode.children.map((replyCommentNode) => {
        return (
          <CommentThread
            key={replyCommentNode.comment.id}
            sx={{ marginLeft: '20px' }}
            commentNode={replyCommentNode}
            replyParent={replyParent}
            onClickReply={onClickReply}
            onSaveNewReply={onSaveNewReply}
            newCommentText={newCommentText}
            onChangeNewComment={onChangeNewComment}
            onClickEdit={onClickEdit}
            onSaveEdit={onSaveEdit}
            onDeleteComment={onDeleteComment}
          ></CommentThread>
        );
      })}
    </Box>
  );
}
