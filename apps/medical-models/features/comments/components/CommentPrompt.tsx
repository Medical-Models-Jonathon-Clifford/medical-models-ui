import { AddComment } from './AddComment';
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { ProfileIcon } from '../../../components/profile-icon/ProfileIcon';
import Box from '@mui/material/Box';
import styles from './CommentPrompt.module.scss';

type CommentPromptState = 'prompt' | 'add-comment';

export function CommentPrompt({
  newCommentText,
  onSave,
}: {
  newCommentText: string;
  onSave: (updatedCommentTest: string) => void;
}) {
  const [commentPromptState, setCommentPromptState] =
    useState<CommentPromptState>('prompt');

  const handleSave = (updatedCommentTest: string) => {
    onSave(updatedCommentTest);
    setCommentPromptState('prompt');
  };

  const handleCancel = () => {
    setCommentPromptState('prompt');
  };

  return (
    <>
      <Box className={styles.comment_prompt_box}>
        {commentPromptState === 'prompt' && (
          <>
            <ProfileIcon />
            <Button
              variant="prompt"
              onClick={() => setCommentPromptState('add-comment')}
            >
              Share your thoughts...
            </Button>
          </>
        )}
        {commentPromptState === 'add-comment' && (
          <AddComment
            newCommentText={newCommentText}
            onSave={handleSave}
            onCancel={handleCancel}
          ></AddComment>
        )}
      </Box>
    </>
  );
}
