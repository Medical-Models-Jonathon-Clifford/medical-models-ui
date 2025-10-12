import { Stack, StackProps } from '@mui/material';

export const DashStack = (props: StackProps) => (
  <Stack
    direction="column"
    sx={{ gap: '8px', padding: '8px' }}
    {...props}
  ></Stack>
);
