import { ViewTextProps } from '../../../types/block';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { MouseEventHandler, useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

type EditTextState = 'Loading' | 'Editing' | 'Viewing';

export function ReadOnlyText({ text }: ViewTextProps) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Paper>
  );
}

export function EditText({
  value,
  saveChanges,
}: {
  value: string;
  saveChanges: (value: string) => void;
}) {
  const [inputText, setInputText] = useState(value);
  const [state, setState] = useState<EditTextState>(
    value ? 'Viewing' : 'Editing'
  );

  const clickEditTextBlock: MouseEventHandler<HTMLButtonElement> = (event) => {
    setState('Editing');
  };

  const clickSaveTextBlock: MouseEventHandler<HTMLButtonElement> = (event) => {
    saveChanges(inputText);
    setState('Viewing');
  };

  return (
    <>
      {state === 'Loading' && (
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Typography variant="body1">...</Typography>
          </Box>
        </Paper>
      )}
      {state === 'Viewing' && (
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Typography variant="body1">{value}</Typography>
            <Button onClick={clickEditTextBlock}>Edit</Button>
          </Box>
        </Paper>
      )}
      {state === 'Editing' && (
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              value={inputText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputText(event.target.value);
              }}
            />
            <Button onClick={clickSaveTextBlock}>Save</Button>
          </Box>
        </Paper>
      )}
    </>
  );
}
