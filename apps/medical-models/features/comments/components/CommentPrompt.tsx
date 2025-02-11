import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AddComment } from './AddComment';
import { ProfileIcon } from '../../../components/profile-icon/ProfileIcon';
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
            <button
              className={styles.comment_prompt_button}
              onClick={() => setCommentPromptState('add-comment')}
            >
              <Typography>Share your thoughts...</Typography>
            </button>
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
