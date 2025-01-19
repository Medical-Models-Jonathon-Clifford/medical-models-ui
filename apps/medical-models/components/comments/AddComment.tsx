import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

type AddCommentProps = {
  sx?: SxProps;
  newCommentText: string;
  onChangeNewComment: (newCommentText: string) => void;
  onSaveNewComment: () => void;
};

export function AddComment({
  sx,
  newCommentText,
  onChangeNewComment,
  onSaveNewComment,
}: AddCommentProps) {
  const handleChangeComment: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onChangeNewComment(event.target.value);
  };

  return (
    <Box sx={sx}>
      <TextField
        id="outlined-multiline-flexible"
        label="Comment"
        multiline
        placeholder="Add a comment"
        value={newCommentText}
        onChange={handleChangeComment}
      />
      <Button onClick={onSaveNewComment}>Save</Button>
    </Box>
  );
}
