import { useSession } from 'next-auth/react';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProfileIcon } from '../../../components/profile-icon/ProfileIcon';
import styles from './AddComment.module.scss';

type AddCommentProps = {
  sx?: SxProps;
  newCommentText?: string;
  onSave: (updatedCommentTest: string) => void;
  onCancel: () => void;
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
  onCancel,
}: AddCommentProps) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: newCommentText,
    },
  });
  const { data: session } = useSession();

  const onSubmit = (d: CommentSchema) => {
    const updatedComment = commentSchema.parse(d).comment;
    onSave(updatedComment);
  };

  const onReset = () => {
    reset();
    onCancel();
  };

  return (
    <Box className={styles.add_comment_box} sx={sx}>
      {session && (
        <Avatar src={session.user.picture}>
          <ProfileIcon
            givenName={session.user.givenName}
            familyName={session.user.familyName}
            size={'100%'}
          />
        </Avatar>
      )}
      <form
        className={styles.add_comment_form}
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}
      >
        <TextField
          id="outlined-multiline-flexible"
          className={styles.add_comment_text_field}
          multiline
          placeholder="Go ahead, just type them in..."
          {...register('comment', { onChange: () => trigger('comment') })}
        />
        <Box className={styles.add_comment_button_box}>
          <Button variant="contained" type="submit">
            Save
          </Button>
          <Button variant="text" type="reset">
            Cancel
          </Button>
        </Box>
        {errors.comment && (
          <p className={styles.validation_error}>{errors.comment.message}</p>
        )}
      </form>
    </Box>
  );
}
