import { FormEventHandler, MouseEventHandler, useState } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  EditOutlined as EditOutlinedIcon,
  Delete as DeleteIcon,
  SaveOutlined as SaveOutlinedIcon,
  ArrowDownwardOutlined as ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlined as ArrowUpwardOutlinedIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import { ViewImageProps } from '../../../types/block';
import { MEDICAL_MODELS_SERVICE_BASE_URL } from '../../../app/constants';
import { postImage } from '../../../client/mm-document-client';

type EditImageState = 'Loading' | 'Editing' | 'Viewing';

export function ReadOnlyImage({ filename }: ViewImageProps) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          width: '100%',
          height: '200px',
          position: 'relative',
        }}
      >
        <Image
          fill={true}
          style={{ objectFit: 'contain' }}
          src={`/images/${filename}`}
          alt={`Image of ${filename}`}
        />
      </Box>
    </Paper>
  );
}

export function EditImage({
  filename,
  saveChanges,
  deleteBlock,
  moveUp,
  moveDown,
}: {
  filename: string;
  saveChanges: (newFilename: string) => void;
  deleteBlock: () => void;
  moveUp: () => void;
  moveDown: () => void;
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
          <Stack flexDirection="row" align-items="flex-start">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
                width: '100%',
                height: '200px',
                position: 'relative',
              }}
            >
              <Image
                fill={true}
                objectFit={'contain'}
                src={`/images/${imgFilename}`}
                alt={`Image of ${filename}`}
              />
            </Box>
            <Box>
              <Stack flexDirection="row">
                <Tooltip title="Move up">
                  <IconButton aria-label="up" onClick={moveUp}>
                    <ArrowUpwardOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Move down">
                  <IconButton aria-label="down" onClick={moveDown}>
                    <ArrowDownwardOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit block">
                  <IconButton aria-label="edit" onClick={clickEditImageBlock}>
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete block">
                  <IconButton aria-label="delete" onClick={deleteBlock}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </Stack>
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
              style={{ width: '100%' }}
            >
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                sx={{ width: '100%' }}
              >
                <input type="file" name="file" accept="image/*" />
                <Tooltip title="Save block">
                  <IconButton type="submit" aria-label="save">
                    <SaveOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </form>
          </Box>
        </Paper>
      )}
    </>
  );
}
