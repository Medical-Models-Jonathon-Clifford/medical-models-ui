'use client';

import * as React from 'react';
import { MouseEventHandler, useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import {
  BlockPaper,
  DeleteBlock,
  EditBlock,
  MoveDown,
  MoveUp,
  SaveBlock,
} from '@mm/components/server';
import { EDITING, LoadEditViewState, VIEWING } from '@mm/types';

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
  const [state, setState] = useState<LoadEditViewState>(
    value ? VIEWING : EDITING
  );

  const clickEditTextBlock: MouseEventHandler<HTMLButtonElement> = (event) => {
    setState(EDITING);
  };

  const clickSaveTextBlock: MouseEventHandler<HTMLButtonElement> = (event) => {
    saveChanges(inputText);
    setState(VIEWING);
  };

  return (
    <>
      {state === VIEWING && (
        <BlockPaper>
          <Stack gap="8px" flexDirection="row" justifyContent="space-between">
            <Typography variant="body1">{value}</Typography>
            <Box>
              <MoveUp onClick={moveUp}></MoveUp>
              <MoveDown onClick={moveDown}></MoveDown>
              <EditBlock onClick={clickEditTextBlock}></EditBlock>
              <DeleteBlock onClick={deleteBlock}></DeleteBlock>
            </Box>
          </Stack>
        </BlockPaper>
      )}
      {state === EDITING && (
        <BlockPaper>
          <Stack gap="8px" flexDirection="row" justifyContent="space-between">
            <TextField
              sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Edit text"
              multiline
              value={inputText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputText(event.target.value);
              }}
            />
            <SaveBlock onClick={clickSaveTextBlock} />
          </Stack>
        </BlockPaper>
      )}
    </>
  );
}
