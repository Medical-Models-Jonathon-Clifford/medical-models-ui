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
} from '../../client/mm-comment-client';
import {
  CommentNode,
  compareComments,
  countComments,
  EMPTY_COMMENT,
  WholeCommentState,
} from './comments';
import { CommentThread } from './CommentThread';
import { AddComment } from './AddComment';

export function Comments({ documentId }: { documentId: string }) {
  const [comments, setComments] = React.useState<CommentNode[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>(EMPTY_COMMENT);
  const [replyParent, setReplyParent] = React.useState<CommentNode | null>(
    null
  );
  const [wholeCommentsState, setWholeCommentsState] =
    useState<WholeCommentState>('TopLevelComment');

  useEffect(() => {
    getCommentsForDocument(documentId).then((response) => {
      setComments(response.data);
    });
  }, [documentId]);

  const handleChangeNewComment = (newCommentText: string): void => {
    setNewCommentText(newCommentText);
  };

  const commentCount = () => {
    return countComments(comments);
  };

  const handleReply = (comment: CommentNode): void => {
    setReplyParent(comment);
  };

  const handleSaveNewComment = (updatedCommentText: string) => {
    saveNewComment(documentId, updatedCommentText).then((_) => {
      reloadComments();
      resetNewCommentText();
    });
  };

  const handleSaveNewReply = (
    parentComment: CommentNode,
    replyText: string
  ): void => {
    saveNewReplyComment(documentId, replyText, parentComment.comment.id).then(
      (_) => {
        reloadComments();
        resetNewCommentText();
        setReplyParent(null);
      }
    );
  };

  const editComment = (comment: CommentNode, newText: string): void => {
    editCommentById(comment.comment.id, newText).then((_) => {
      reloadComments();
      resetNewCommentText();
    });
  };

  const handleDeleteComment = (toDelete: CommentNode): void => {
    deleteCommentById(toDelete.comment.id)
      .then((_) => reloadComments())
      .catch((e) => {
        console.error('There was an error deleting comments ', toDelete, e);
      });
  };

  const reloadComments = () => {
    setWholeCommentsState('Reloading');
    getCommentsForDocument(documentId)
      .then((response) => {
        setComments(response.data);
        setWholeCommentsState('TopLevelComment');
      })
      .catch((e) => {
        console.error('There was an error reloading comments: ', e);
      });
  };

  const resetNewCommentText = () => {
    setNewCommentText(EMPTY_COMMENT);
  };

  const sortedComments = () => comments.sort(compareComments);

  const handleSaveEdit = (commentNode: CommentNode) => {
    setWholeCommentsState('TopLevelComment');
    editComment(commentNode, newCommentText);
  };

  const handleClickEdit = (newCommentText: string) => {
    setNewCommentText(newCommentText);
    setWholeCommentsState('Editing');
  };

  return (
    <>
      <Typography>{commentCount()} document comments</Typography>
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
            onChangeNewComment={handleChangeNewComment}
            onSaveNewComment={handleSaveNewComment}
          ></AddComment>
        )}
      </Paper>
    </>
  );
}
