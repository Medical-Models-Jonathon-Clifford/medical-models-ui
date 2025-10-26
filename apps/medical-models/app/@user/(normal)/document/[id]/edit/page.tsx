'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { EditDocumentName } from '../../../../../../features/blocks/document-name/DocumentName';
import { getDocument, updateDocument } from '@mm/clients';
import { Document, SimplePageState } from '@mm/types';
import { EditBody } from './EditBody';
import {
  borderColorLayoutLines,
  borderColorLayoutLinesHover,
} from '@mm/tokens';
import { formatTimeSince } from '@mm/utils';

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Document | undefined>(undefined);
  const [viewDocState, setViewDocState] = useState<SimplePageState>('loading');

  useEffect(() => {
    async function fetchDocument() {
      const response = await getDocument(params.id);
      setData(response.data);
      setViewDocState('loaded');
    }
    fetchDocument();
  }, [params.id]);

  const saveBodyChanges = async (newBody: string) => {
    const titleToSave = data && data.title ? data.title : null;
    const response = await updateDocument(
      params.id,
      titleToSave,
      newBody,
      'ACTIVE'
    );
    setData(response.data);
    setViewDocState('loaded');
  };

  const saveDocumentNameChanges = async (newName: string) => {
    const bodyToSave = data && data.body ? data.body : null;
    const response = await updateDocument(
      params.id,
      newName,
      bodyToSave,
      'ACTIVE'
    );
    setData(response.data);
    setViewDocState('loaded');
  };

  return (
    <>
      {viewDocState === 'loading' && <p>Loading...</p>}
      {viewDocState === 'loaded' && data && (
        <Box
          sx={{
            padding: '16px 0',
          }}
        >
          <Stack justifyContent={'flex-end'} direction={'row'} spacing={1}>
            <Button
              href={`/document/${params.id}`}
              startIcon={<SaveOutlined />}
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
              Save Page
            </Button>
          </Stack>
          <Stack>
            <EditDocumentName
              documentName={data.title}
              saveChanges={saveDocumentNameChanges}
            ></EditDocumentName>
          </Stack>
          <p>
            Created: {formatTimeSince(data.createdDate)} by{' '}
            {data.creatorFullName} - Last modified:{' '}
            {formatTimeSince(data.modifiedDate)}
          </p>

          <EditBody
            body={data.body}
            saveBodyChanges={saveBodyChanges}
          ></EditBody>
        </Box>
      )}
    </>
  );
}
