import { ViewImageProps } from '../../../types/block';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { FormEventHandler, MouseEventHandler, useState } from 'react';
import Button from '@mui/material/Button';
import { MEDICAL_MODELS_SERVICE_BASE_URL } from '../../../app/constants';
import { postImage } from '../../../client/mm-document-client';

type EditImageState = 'Loading' | 'Editing' | 'Viewing';

export function ReadOnlyImage({ filename }: ViewImageProps) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <img src={`/images/${filename}`} alt={'Image block'}/>
      </Box>
    </Paper>
  );
}

export function EditImage({
  filename,
  saveChanges,
}: {
  filename: string;
  saveChanges: (newFilename: string) => void;
}) {
  const [imgFilename, setImgFilename] = useState(filename);
  const [state, setState] = useState<EditImageState>(
    filename ? 'Viewing' : 'Editing'
  );

  const clickEditImageBlock: MouseEventHandler<HTMLButtonElement> = (event) => {
    setState('Editing');
  };

  const handleSubmitImage: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const response = await postImage(event.target as HTMLFormElement);
    const newImgFilename = response.data;
    saveChanges(newImgFilename);
    setImgFilename(newImgFilename);
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
            <img src={`/images/${imgFilename}`} />
            <Button onClick={clickEditImageBlock}>Edit</Button>
          </Box>
        </Paper>
      )}
      {state === 'Editing' && (
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <form
              onSubmit={handleSubmitImage}
              action={`${MEDICAL_MODELS_SERVICE_BASE_URL}/images`}
              method="POST"
              encType="multipart/form-data"
            >
              <input type="file" name="file" accept="image/*" />
              <Button type="submit">Save</Button>
            </form>
          </Box>
        </Paper>
      )}
    </>
  );
}
