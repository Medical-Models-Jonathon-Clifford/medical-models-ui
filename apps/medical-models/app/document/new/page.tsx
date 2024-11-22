'use client';

import * as React from 'react';
import { MouseEventHandler, useState } from 'react';
import DocumentName from './DocumentName';
import Blocks from './Blocks';
import Divider from '@mui/material/Divider';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { addReplyToCommentNodes, CommentNode, countComments, deleteCommentNode, editCommentNode } from './comments';
import Box from '@mui/material/Box';

type CommentState = 'View' | 'Edit';

function CommentThread({
                         commentNode,
                         replyParent,
                         clickReply,
                         clickSaveNewReply,
                         newCommentText,
                         newCommentOnChange,
                         setNewCommentText,
                         editComment,
                         setWholeCommentsState,
  deleteComment
                       }: {
  commentNode: CommentNode,
  replyParent: CommentNode | null,
  clickReply: (comment: CommentNode) => void,
  clickSaveNewReply: (parentComment: CommentNode) => void,
  newCommentText: string,
  newCommentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  setNewCommentText: (value: (((prevState: string) => string) | string)) => void,
  editComment: (comment: CommentNode, newText: string) => void,
  setWholeCommentsState: (value: (((prevState: string) => string) | string)) => void,
  deleteComment: (toDelete: CommentNode) => void
}) {
  const [commentState, setCommentState] = useState<CommentState>('View');

  const clickEdit = () => {
    setCommentState('Edit');
    setWholeCommentsState('Editing');
  };

  const clickSave = () => {
    editComment(commentNode, newCommentText);
    setCommentState('View');
    setNewCommentText('');
    setWholeCommentsState('TopLevelComment');
  }

  const clickDelete = () => {
    deleteComment(commentNode);
  };

  return (
    <Box key={commentNode.uuid}>
      {commentState === 'View' && (
        <>
          <Typography>{commentNode.text}</Typography>
          <Button onClick={() => clickReply(commentNode)}>Reply</Button>
          <Button onClick={clickEdit}>Edit</Button>
          <Button onClick={clickDelete}>Delete</Button>
        </>
      )}
      {commentState == 'Edit' && (
        // TODO: Deduplicate the add comment components at some point
        <>
          <Box>
            <TextField
              id="outlined-multiline-flexible"
              label="Comment"
              multiline
              placeholder="Add a comment"
              value={newCommentText}
              onChange={newCommentOnChange}
            />
            <Button onClick={clickSave}>Save</Button>
          </Box>
        </>
      )}
      {replyParent === commentNode && (
        <Box>
          <TextField
            id="outlined-multiline-flexible"
            label="Comment"
            multiline
            placeholder="Add a comment"
            value={newCommentText}
            onChange={newCommentOnChange}
          />
          <Button onClick={() => clickSaveNewReply(commentNode)}>Save</Button>
        </Box>
      )}
      <Box sx={{marginLeft: '20px'}}>
        {commentNode.replies.map((replyCommentNode) => {
          return <CommentThread key={replyCommentNode.uuid} commentNode={replyCommentNode} replyParent={replyParent}
                                clickReply={clickReply} clickSaveNewReply={clickSaveNewReply}
                                newCommentText={newCommentText} newCommentOnChange={newCommentOnChange} setNewCommentText={setNewCommentText} editComment={editComment} setWholeCommentsState={setWholeCommentsState} deleteComment={deleteComment}></CommentThread>;
        })}
      </Box>
    </Box>
  );
}

type WholeCommentState = 'TopLevelComment' | 'Editing';

export default function NewDocument() {
  const [comments, setComments] = React.useState<CommentNode[]>([]);
  const [newCommentText, setNewCommentText]: [string, (value: (((prevState: string) => string) | string)) => void] = useState('');
  const [replyParent, setReplyParent] = React.useState<CommentNode | null>(null);
  const [wholeCommentsState, setWholeCommentsState]: [string, (value: (((prevState: string) => string) | string)) => void] = useState('TopLevelComment');

  const newCommentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentText(event.target.value);
  };

  const clickSaveNewComment: MouseEventHandler<HTMLButtonElement> = (event) => {
    setComments((prevState) => {
      return [...prevState, {
        uuid: crypto.randomUUID(),
        text: newCommentText,
        author: 'User',
        dateTimeAdded: new Date(),
        dateTimeUpdated: new Date(),
        replies: []
      }];
    });
    setNewCommentText('');
  };

  const getCommentCount = () => {
    return countComments(comments);
  };

  const clickReply: (comment: CommentNode) => void = (comment: CommentNode) => {
    setReplyParent(comment);
  };

  const clickSaveNewReply: (parentComment: CommentNode) => void = (parentComment: CommentNode) => {
    console.log('newCommentText');
    console.log(newCommentText);
    setComments((prevState) => {
      console.log('prevState');
      console.log(prevState);
      let newCommentNodes = addReplyToCommentNodes(newCommentText, parentComment, prevState);
      console.log('newCommentNodes');
      console.log(newCommentNodes);
      return newCommentNodes;
    });
    setNewCommentText('');
    setReplyParent(null);
  };

  const editComment: (comment: CommentNode, newText: string) => void = (comment: CommentNode, newText: string) => {
    setComments((prevState) => {
      return editCommentNode(newText, comment, prevState);
    });
  };

  const deleteComment: (toDelete: CommentNode) => void = (toDelete: CommentNode) => {
    setComments((prevState) => {
      return deleteCommentNode(toDelete, prevState);
    });
  };

  return (
    <>
      <p>New Document</p>
      <DocumentName></DocumentName>
      <Blocks></Blocks>
      {/* Comments */}
      <Divider sx={{ margin: '16px' }}></Divider>
      <Typography>{getCommentCount()} document comments</Typography>
      <Paper variant="outlined" sx={{ padding: '8px' }}>
        {comments.map((comment: CommentNode) => {
          return <CommentThread key={comment.uuid} commentNode={comment} replyParent={replyParent}
                                clickReply={clickReply} clickSaveNewReply={clickSaveNewReply}
                                newCommentText={newCommentText} newCommentOnChange={newCommentOnChange} setNewCommentText={setNewCommentText} editComment={editComment} setWholeCommentsState={setWholeCommentsState} deleteComment={deleteComment}></CommentThread>;
        })}
        {replyParent === null && wholeCommentsState === 'TopLevelComment' &&
          <Box>
            <TextField
              id="outlined-multiline-flexible"
              label="Comment"
              multiline
              placeholder="Add a comment"
              value={newCommentText}
              onChange={newCommentOnChange}
            />
            <Button onClick={clickSaveNewComment}>Save</Button>
          </Box>
        }
      </Paper>
    </>
  );
}
