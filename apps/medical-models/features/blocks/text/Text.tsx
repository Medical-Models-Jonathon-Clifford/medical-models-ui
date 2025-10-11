'use client';

import * as React from 'react';
import { MouseEventHandler, useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { SaveOutlined as SaveOutlinedIcon } from '@mui/icons-material';
import { ViewTextProps } from '../../../types/block';
import { MoveUp } from '../../../components/block-buttons/MoveUp';
import { MoveDown } from '../../../components/block-buttons/MoveDown';
import { EditBlock } from '../../../components/block-buttons/EditBlock';
import { DeleteBlock } from '../../../components/block-buttons/DeleteBlock';

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
  deleteBlock,
  moveUp,
  moveDown,
}: {
  value: string;
  saveChanges: (value: string) => void;
  deleteBlock: () => void;
  moveUp: () => void;
  moveDown: () => void;
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
          <Stack gap={'8px'} flexDirection="row" justifyContent="space-between">
            <Typography variant="body1">{value}</Typography>
            <Box>
              <MoveUp onClick={moveUp}></MoveUp>
              <MoveDown onClick={moveDown}></MoveDown>
              <EditBlock onClick={clickEditTextBlock}></EditBlock>
              <DeleteBlock onClick={deleteBlock}></DeleteBlock>
            </Box>
          </Stack>
        </Paper>
      )}
      {state === 'Editing' && (
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Stack gap={'8px'} flexDirection="row" justifyContent="space-between">
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              value={inputText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputText(event.target.value);
              }}
            />
            <Tooltip title="Save block">
              <IconButton aria-label="save" onClick={clickSaveTextBlock}>
                <SaveOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Paper>
      )}
    </>
  );
}
