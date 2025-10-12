'use client';

import { FormEventHandler, MouseEventHandler, useState } from 'react';
import { Box, IconButton, Paper, Stack, Tooltip } from '@mui/material';
import { SaveOutlined as SaveOutlinedIcon } from '@mui/icons-material';
import Image from 'next/image';
import { MEDICAL_MODELS_SERVICE_BASE_URL } from '../../../app/constants';
import { postImage } from '../../../client/document-client';
import { MoveUp } from '../../../components/block-buttons/MoveUp';
import { MoveDown } from '../../../components/block-buttons/MoveDown';
import { EditBlock } from '../../../components/block-buttons/EditBlock';
import { DeleteBlock } from '../../../components/block-buttons/DeleteBlock';
import { EDITING, LoadEditViewState, VIEWING } from '../../../types/states';

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
  const [state, setState] = useState<LoadEditViewState>(
    filename ? VIEWING : EDITING
  );

  const clickEditImageBlock: MouseEventHandler<HTMLButtonElement> = (event) => {
    setState(EDITING);
  };

  const handleSubmitImage: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const response = await postImage(event.target as HTMLFormElement);
    const newImgFilename = response.data;
    saveChanges(newImgFilename);
    setImgFilename(newImgFilename);
    setState(VIEWING);
  };

  return (
    <>
      {state === VIEWING && (
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
                style={{ objectFit: 'contain' }}
                // objectFit={'contain'}
                src={`/images/${imgFilename}`}
                alt={`Image of ${filename}`}
              />
            </Box>
            <Box>
              <Stack flexDirection="row">
                <MoveUp onClick={moveUp}></MoveUp>
                <MoveDown onClick={moveDown}></MoveDown>
                <EditBlock onClick={clickEditImageBlock}></EditBlock>
                <DeleteBlock onClick={deleteBlock}></DeleteBlock>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      )}
      {state === EDITING && (
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
