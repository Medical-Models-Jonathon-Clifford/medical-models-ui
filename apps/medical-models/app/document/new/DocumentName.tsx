import { Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MouseEventHandler } from 'react';

type DocNameState = 'Not Set' | 'Editing' | 'Display';

export default function DocumentName() {
  const [documentName, setDocumentName] = React.useState('');
  const [docNameState, setDocNameState] = React.useState<DocNameState>('Not Set');

  const onDocNameSubmit = (event: any) => {
    event.preventDefault();
    setDocNameState('Display');
  };

  const setDocNameButtonClicked: MouseEventHandler<HTMLButtonElement> = (event) => {
    setDocNameState('Editing');
  };

  const onDocNameSaveButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setDocNameState('Display');
  };

  return (
    <Stack direction="row">
      {docNameState === 'Not Set' && (
        <Button onClick={setDocNameButtonClicked}>Set Document Name</Button>
      )}
      {docNameState === 'Editing' && (
        <form onSubmit={onDocNameSubmit}>
          <FormControl>
            <TextField
              id="outlined-basic"
              label="New Document Name"
              variant="outlined"
              value={documentName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDocumentName(event.target.value);
              }} />
          </FormControl>
          <Button onClick={onDocNameSaveButtonClick}>Save</Button>
        </form>
      )}
      {docNameState === 'Display' && (
        <>
          <Typography>{documentName}</Typography>
          <Button onClick={setDocNameButtonClicked}>Update Document Name</Button>
        </>
      )}
    </Stack>
  );
}
