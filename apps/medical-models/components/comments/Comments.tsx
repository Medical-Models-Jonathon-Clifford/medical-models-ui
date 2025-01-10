import Paper from '@mui/material/Paper';
import { CommentNode, countComments, deleteCommentNode } from '../../usecases/comments';
import Box from '@mui/material/Box';
import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import { MouseEventHandler, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import axios from 'axios';

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
  setWholeCommentsState: (value: (((prevState: WholeCommentState) => WholeCommentState) | WholeCommentState)) => void,
  deleteComment: (toDelete: CommentNode) => void
}) {
  const [commentState, setCommentState] = useState<CommentState>('View');

  const clickEdit = () => {
    setNewCommentText(commentNode.comment.body);
    setCommentState('Edit');
    setWholeCommentsState('Editing');
  };

  const clickSave = () => {
    editComment(commentNode, newCommentText);
    setCommentState('View');
    setNewCommentText('');
    setWholeCommentsState('TopLevelComment');
  };

  const clickDelete = () => {
    deleteComment(commentNode);
  };

  return (
    <Box key={commentNode.comment.id}>
      {commentState === 'View' && (
        <>
          <Typography>{commentNode.comment.body}</Typography>
          <Typography variant="caption">Created: {String(commentNode.comment.createdDate)},
            Edited: {commentNode.comment.modifiedDate.toString()}</Typography>
          <Stack direction="row" spacing={1}>
            <Button onClick={() => clickReply(commentNode)}>Reply</Button>
            <Button onClick={clickEdit}>Edit</Button>
            <Button onClick={clickDelete}>Delete</Button>
          </Stack>
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
        <Box sx={{ marginLeft: '20px' }}>
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
      <Box sx={{ marginLeft: '20px' }}>
        {commentNode.childComments.map((replyCommentNode) => {
          return <CommentThread key={replyCommentNode.comment.id} commentNode={replyCommentNode}
                                replyParent={replyParent}
                                clickReply={clickReply} clickSaveNewReply={clickSaveNewReply}
                                newCommentText={newCommentText} newCommentOnChange={newCommentOnChange}
                                setNewCommentText={setNewCommentText} editComment={editComment}
                                setWholeCommentsState={setWholeCommentsState}
                                deleteComment={deleteComment}></CommentThread>;
        })}
      </Box>
    </Box>
  );
}

type WholeCommentState = 'TopLevelComment' | 'Editing';

export function Comments({ documentId }: { documentId: string }) {

  const [comments, setComments] = React.useState<CommentNode[]>([]);
  const [newCommentText, setNewCommentText]: [string, (value: (((prevState: string) => string) | string)) => void] = useState('');
  const [replyParent, setReplyParent] = React.useState<CommentNode | null>(null);
  const [wholeCommentsState, setWholeCommentsState]: [WholeCommentState, (value: (((prevState: WholeCommentState) => WholeCommentState) | WholeCommentState)) => void] = useState<WholeCommentState>('TopLevelComment');

  useEffect(() => {
    axios.get(`http://localhost:8081/comments/documents/${documentId}`)
      .then(response => {
        setComments(response.data);
      });
  }, []);

  const newCommentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCommentText(event.target.value);
  };

  const clickSaveNewComment: MouseEventHandler<HTMLButtonElement> = (event) => {
    axios.post('http://localhost:8081/comments', {
      documentId: documentId,
      body: newCommentText,
      creator: '1'
    })
      .then(response => {
        return axios.get(`http://localhost:8081/comments/documents/${documentId}`);
      }).then(response => {
      setComments(response.data);
      setNewCommentText('');
    });
  };

  const getCommentCount = () => {
    return countComments(comments);
  };

  const clickReply: (comment: CommentNode) => void = (comment: CommentNode) => {
    setReplyParent(comment);
  };

  const clickSaveNewReply: (parentComment: CommentNode) => void = (parentComment: CommentNode) => {
    axios.post('http://localhost:8081/comments', {
      documentId: documentId,
      body: newCommentText,
      creator: '1',
      parentCommentId: parentComment.comment.id
    })
      .then(response => {
        return axios.get(`http://localhost:8081/comments/documents/${documentId}`);
      }).then(response => {
      setComments(response.data);
      setNewCommentText('');
      setReplyParent(null);
    });
  };

  const editComment: (comment: CommentNode, newText: string) => void = (comment: CommentNode, newText: string) => {
    axios.put(`http://localhost:8081/comments/${comment.comment.id}`, {
      body: newText
    })
      .then(response => {
        return axios.get(`http://localhost:8081/comments/documents/${documentId}`);
      }).then(response => {
      setComments(response.data);
      setNewCommentText('');
    });
  };

  const deleteComment: (toDelete: CommentNode) => void = (toDelete: CommentNode) => {
    axios.delete(`http://localhost:8081/comments/${toDelete.comment.id}`)
      .then(response => {
        return axios.get(`http://localhost:8081/comments/documents/${documentId}`);
      }).then(response => {
      setComments(response.data);
      setNewCommentText('');
    });
  };

  const compareComments = (a: CommentNode, b: CommentNode): number => {
    if (a.comment.createdDate < b.comment.createdDate) {
      return -1;
    } else if (a.comment.createdDate > b.comment.createdDate) {
      return 1;
    } else {
      return 0;
    }
  }

  return (
    <>
      <Typography>{getCommentCount()} document comments</Typography>
      <Paper variant="outlined" sx={{ padding: '8px' }}>
        {comments.sort(compareComments).map((comment: CommentNode) => {
          return <CommentThread key={comment.comment.id} commentNode={comment} replyParent={replyParent}
                                clickReply={clickReply} clickSaveNewReply={clickSaveNewReply}
                                newCommentText={newCommentText} newCommentOnChange={newCommentOnChange}
                                setNewCommentText={setNewCommentText} editComment={editComment}
                                setWholeCommentsState={setWholeCommentsState}
                                deleteComment={deleteComment}></CommentThread>;
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
