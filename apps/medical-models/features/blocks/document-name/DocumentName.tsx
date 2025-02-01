import { Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { FormEventHandler, MouseEventHandler } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
  const [inputDocumentName, setInputDocumentName] =
    React.useState(documentName);
  const [docNameState, setDocNameState] = React.useState<DocNameState>(
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
          <FormControl>
            <TextField
              id="outlined-basic"
              label="New Document Name"
              variant="outlined"
              value={inputDocumentName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputDocumentName(event.target.value);
              }}
            />
          </FormControl>
          <Button onClick={onDocNameSaveButtonClick}>Save</Button>
        </form>
      )}
      {docNameState === 'Viewing' && (
        <>
          <Typography variant="h2">{documentName}</Typography>
          <Button onClick={setDocNameButtonClicked}>
            Update Document Name
          </Button>
        </>
      )}
    </Stack>
  );
}
