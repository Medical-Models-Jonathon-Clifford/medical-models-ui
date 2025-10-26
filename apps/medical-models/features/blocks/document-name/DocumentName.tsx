'use client';

import * as React from 'react';
import { FormEventHandler, MouseEventHandler, useState } from 'react';
import {
  Stack,
  TextField,
  FormControl,
  Typography,
  Button,
} from '@mui/material';
import {
  EditOutlined as EditOutlinedIcon,
  SaveOutlined as SaveOutlinedIcon,
} from '@mui/icons-material';
import {
  borderColorLayoutLines,
  borderColorLayoutLinesHover,
} from '@mm/tokens';

type DocNameState = 'Editing' | 'Viewing';

export function ReadOnlyDocumentName({
  documentName,
}: {
  documentName: string;
}) {
  return <Typography variant="h2">{documentName}</Typography>;
}

export function EditDocumentName({
  documentName,
  saveChanges,
}: {
  documentName: string;
  saveChanges: (newName: string) => void;
}) {
  const [inputDocumentName, setInputDocumentName] = useState(documentName);
  const [docNameState, setDocNameState] = useState<DocNameState>(
    documentName ? 'Viewing' : 'Editing'
  );

  const onDocNameSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setDocNameState('Viewing');
  };

  const setDocNameButtonClicked: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setDocNameState('Editing');
  };

  const onDocNameSaveButtonClick: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    saveChanges(inputDocumentName);
    setDocNameState('Viewing');
  };

  return (
    <Stack direction="row">
      {docNameState === 'Editing' && (
        <form onSubmit={onDocNameSubmit}>
          <Stack flexDirection="column" alignItems="flex-start" rowGap="8px">
            <FormControl>
              <TextField
                id="outlined-basic"
                sx={{ width: '75ch' }}
                variant="outlined"
                value={inputDocumentName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setInputDocumentName(event.target.value);
                }}
              />
            </FormControl>
            <Button
              onClick={onDocNameSaveButtonClick}
              startIcon={<SaveOutlinedIcon />}
              variant="outlined"
              sx={{
                color: 'rgba(0, 0, 0, 0.87)',
                textTransform: 'none',
                borderColor: borderColorLayoutLines,
                padding: '4px 12px',
                '&:hover': {
                  backgroundColor: 'rgba(202,202,202,0.2)',
                  borderColor: borderColorLayoutLinesHover,
                },
              }}
            >
              Save Name
            </Button>
          </Stack>
        </form>
      )}
      {docNameState === 'Viewing' && (
        <Stack flexDirection="column" alignItems="flex-start">
          <Typography variant="h2">{documentName}</Typography>
          <Button
            onClick={setDocNameButtonClicked}
            startIcon={<EditOutlinedIcon />}
            variant="outlined"
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              textTransform: 'none',
              borderColor: borderColorLayoutLines,
              padding: '4px 12px',
              '&:hover': {
                backgroundColor: 'rgba(202,202,202,0.2)',
                borderColor: borderColorLayoutLinesHover,
              },
            }}
          >
            Edit Document Name
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
