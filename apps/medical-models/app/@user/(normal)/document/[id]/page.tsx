'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { ReadOnlyDocumentName } from '../../../../../features/blocks/document-name/DocumentName';
import Divider from '@mui/material/Divider';
import { CommentPanel } from '../../../../../features/comments/components/CommentPanel';
import { getDocument } from '../../../../../client/mm-document-client';
import { ReadOnlyBody } from './ReadOnlyBody';
import {
  borderColorLayoutLines,
  borderColorLayoutLinesHover,
} from '../../../../../variables';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import { formatTimeSince } from '../../../../../utils/date-adapters';

type Document = {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  modifiedDate: Date;
  body: string;
  creator: string;
  state: string;
  creatorFullName: string;
};

type ViewDocState = 'loading' | 'loaded';

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Document | undefined>(undefined);
  const [viewDocState, setViewDocState] = useState<ViewDocState>('loading');

  useEffect(() => {
    async function fetchDocument() {
      const response = await getDocument(params.id);
      setData(response.data);
      setViewDocState('loaded');
    }

    fetchDocument();
  }, [params.id]);

  return (
    <>
      {viewDocState === 'loading' && <p>Loading...</p>}
      {viewDocState === 'loaded' && data && (
        <Box
          sx={{
            padding: '16px 0 0 0',
          }}
        >
          <Stack justifyContent={'flex-end'} direction={'row'} spacing={1}>
            <Button
              href={`/document/${params.id}/edit`}
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
              Edit Page
            </Button>
          </Stack>
          <ReadOnlyDocumentName
            documentName={data.title}
          ></ReadOnlyDocumentName>
          <Typography variant="subtitle1">
            Created: {formatTimeSince(data.createdDate)} by{' '}
            {data.creatorFullName} - Last modified:{' '}
            {formatTimeSince(data.modifiedDate)}
          </Typography>
          <ReadOnlyBody body={data.body}></ReadOnlyBody>
          <Divider variant="middle" />
          <CommentPanel documentId={params.id}></CommentPanel>
        </Box>
      )}
    </>
  );
}
