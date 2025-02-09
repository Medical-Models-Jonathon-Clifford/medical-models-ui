import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './CommentPanel.module.scss';

type AddCommentProps = {
  sx?: SxProps;
  newCommentText?: string;
  onSave: (updatedCommentTest: string) => void;
};

type CommentSchema = {
  comment: string;
};

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, 'Surely you have something more to say?')
    .refine(
      (val) => !['failure', 'fail'].includes(val),
      'Failure is not an option'
    )
    .refine((val) => !val.includes('wait'), 'We wait for no one.')
    .refine(
      (val) => !val.includes('permission'),
      'Better to ask for forgiveness than permission.'
    )
    .refine(
      (val) => !val.includes('ignore'),
      'First they ignore you. Then they laugh at you. Then they fight you. Then you win.'
    )
    .refine(
      (val) => !['quit', 'quitting'].includes(val),
      'Pain is temporary. Quitting lasts forever.'
    ),
});

export function AddComment({
  sx,
  newCommentText = '',
  onSave,
}: AddCommentProps) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: newCommentText,
    },
  });

  const onSubmit = (d: CommentSchema) => {
    const updatedComment = commentSchema.parse(d).comment;
    onSave(updatedComment);
  };

  return (
    <Box sx={sx}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          placeholder="Go ahead, just type them in..."
          {...register('comment', { onChange: () => trigger('comment') })}
        />
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
      {errors.comment && (
        <p className={styles.validation_error}>{errors.comment.message}</p>
      )}
    </Box>
  );
}
