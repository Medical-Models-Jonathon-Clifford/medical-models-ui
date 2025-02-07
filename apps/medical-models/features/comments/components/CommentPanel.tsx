import Paper from '@mui/material/Paper';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  deleteCommentById,
  editCommentById,
  getCommentsForDocument,
  saveNewComment,
  saveNewReplyComment,
} from '../api/comment-client';
import {
  CommentNode,
  compareComments,
  countComments,
  EMPTY_COMMENT,
  WholeCommentState,
} from '../utils/comments';
import { CommentThread } from './CommentThread';
import { AddComment } from './AddComment';

export function CommentPanel({ documentId }: { documentId: string }) {
  const [comments, setComments] = React.useState<CommentNode[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>(EMPTY_COMMENT);
  const [replyParent, setReplyParent] = React.useState<CommentNode | null>(
    null
  );
  const [wholeCommentsState, setWholeCommentsState] =
    useState<WholeCommentState>('TopLevelComment');

  useEffect(() => {
    async function fetchComments() {
      const response = await getCommentsForDocument(documentId);
      setComments(response.data);
    }
    fetchComments();
  }, [documentId]);

  const handleChangeNewComment = (newCommentText: string): void => {
    setNewCommentText(newCommentText);
  };

  const handleReply = (comment: CommentNode): void => {
    setReplyParent(comment);
  };

  const handleSaveNewComment = async (updatedCommentText: string) => {
    await saveNewComment(documentId, updatedCommentText);
    await reloadComments();
    resetNewCommentText();
  };

  const handleSaveNewReply = async (
    parentComment: CommentNode,
    replyText: string
  ): Promise<void> => {
    await saveNewReplyComment(documentId, replyText, parentComment.comment.id);
    await reloadComments();
    resetNewCommentText();
    setReplyParent(null);
  };

  const handleDeleteComment = async (toDelete: CommentNode): Promise<void> => {
    try {
      await deleteCommentById(toDelete.comment.id);
      await reloadComments();
    } catch (e) {
      console.error('There was an error deleting comments ', toDelete, e);
    }
  };

  const handleSaveEdit = async (commentNode: CommentNode, editText: string) => {
    setWholeCommentsState('TopLevelComment');
    await editComment(commentNode, editText);
  };

  const handleClickEdit = (newCommentText: string) => {
    setNewCommentText(newCommentText);
    setWholeCommentsState('Editing');
  };

  const resetNewCommentText = () => {
    setNewCommentText(EMPTY_COMMENT);
  };

  const editComment = async (
    comment: CommentNode,
    newText: string
  ): Promise<void> => {
    await editCommentById(comment.comment.id, newText);
    await reloadComments();
    resetNewCommentText();
  };

  const commentCount = () => {
    return countComments(comments);
  };

  const sortedComments = () => comments.sort(compareComments);

  const reloadComments = async () => {
    setWholeCommentsState('Reloading');
    try {
      const response = await getCommentsForDocument(documentId);
      setComments(response.data);
      setWholeCommentsState('TopLevelComment');
    } catch (err) {
      console.error('There was an error reloading comments: ', err);
    }
  };

  return (
    <>
      <Typography data-testid="comment-panel-count">
        {commentCount()} comments
      </Typography>
      <Paper variant="outlined" sx={{ padding: '8px' }}>
        {sortedComments().map((comment: CommentNode) => {
          return (
            <CommentThread
              key={comment.comment.id}
              commentNode={comment}
              replyParent={replyParent}
              newCommentText={newCommentText}
              onClickReply={handleReply}
              onSaveNewReply={handleSaveNewReply}
              onChangeNewComment={handleChangeNewComment}
              onClickEdit={handleClickEdit}
              onSaveEdit={handleSaveEdit}
              onDeleteComment={handleDeleteComment}
            ></CommentThread>
          );
        })}
        {replyParent === null && wholeCommentsState === 'TopLevelComment' && (
          <AddComment
            newCommentText={newCommentText}
            onSave={handleSaveNewComment}
          ></AddComment>
        )}
      </Paper>
    </>
  );
}
