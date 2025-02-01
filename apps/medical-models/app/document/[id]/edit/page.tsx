'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { EditDocumentName } from '../../../../features/blocks/document-name/DocumentName';
import {
  getDocument,
  updateDocument,
} from '../../../../client/mm-document-client';
import { Document } from '../../../../types/document';
import { EditBody } from './EditBody';

type EditDocState = 'loading' | 'loaded';

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Document | undefined>(undefined);
  const [viewDocState, setViewDocState] = useState<EditDocState>('loading');

  useEffect(() => {
    getDocument(params.id).then((response) => {
      setData(response.data);
      setViewDocState('loaded');
    });
  }, [params.id]);

  const saveBodyChanges = (newBody: string) => {
    const titleToSave = data && data.title ? data.title : null;
    updateDocument(params.id, titleToSave, newBody, 'ACTIVE').then(
      (response) => {
        setData(response.data);
        setViewDocState('loaded');
      }
    );
  };

  const saveDocumentNameChanges = (newName: string) => {
    const bodyToSave = data && data.body ? data.body : null;
    updateDocument(params.id, newName, bodyToSave, 'ACTIVE').then(
      (response) => {
        setData(response.data);
        setViewDocState('loaded');
      }
    );
  };

  return (
    <>
      {viewDocState === 'loading' && <p>Loading...</p>}
      {viewDocState === 'loaded' && data && (
        <>
          <Stack>
            <EditDocumentName
              documentName={data.title}
              saveChanges={saveDocumentNameChanges}
            ></EditDocumentName>
          </Stack>
          <p>
            Created: {data.createdDate} by User {data.creator} - Last modified:{' '}
            {data.modifiedDate} - {data.state}
          </p>
          <Button href={`/document/${params.id}`}>Publish Page</Button>
          <EditBody
            body={data.body}
            saveBodyChanges={saveBodyChanges}
          ></EditBody>
        </>
      )}
    </>
  );
}
