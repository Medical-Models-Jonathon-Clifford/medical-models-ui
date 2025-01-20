import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { AddComment } from './AddComment';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Comment } from './Comment';
import { CommentNode } from './comments';
import { useForm } from 'react-hook-form';

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
  onSaveEdit: (comment: CommentNode) => void;
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

  function handleSaveEdit() {
    onSaveEdit(commentNode);
    setCommentState('View');
  }

  const handleReply = () => {
    onClickReply(commentNode);
  };

  const saveNewComment = (replyText: string) => {
    onSaveNewReply(commentNode, replyText);
  };

  return (
    <Box key={commentNode.comment.id} sx={sx}>
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
          onChangeNewComment={onChangeNewComment}
          onSaveNewComment={handleSaveEdit}
        ></AddComment>
      )}
      {replyParent === commentNode && (
        <AddComment
          sx={{ marginLeft: '20px' }}
          newCommentText={newCommentText}
          onChangeNewComment={onChangeNewComment}
          onSaveNewComment={saveNewComment}
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
