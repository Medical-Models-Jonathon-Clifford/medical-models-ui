'use client';

import { FormEventHandler, MouseEventHandler, useState } from 'react';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import { MEDICAL_MODELS_SERVICE_BASE_URL } from '@mm/config';
import { postImage } from '@mm/clients';
import {
  BlockPaper,
  DeleteBlock,
  EditBlock,
  MoveDown,
  MoveUp,
  SaveBlock,
} from '@mm/components/server';
import { EDITING, LoadEditViewState, VIEWING } from '@mm/types';

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
        <BlockPaper>
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
        </BlockPaper>
      )}
      {state === EDITING && (
        <BlockPaper>
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
                <SaveBlock type="submit" />
              </Stack>
            </form>
          </Box>
        </BlockPaper>
      )}
    </>
  );
}
