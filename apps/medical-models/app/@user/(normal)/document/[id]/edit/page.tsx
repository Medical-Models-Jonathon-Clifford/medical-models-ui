'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { EditDocumentName } from '../../../../../../features/blocks/document-name/DocumentName';
import {
  getDocument,
  updateDocument,
} from '../../../../../../client/mm-document-client';
import { Document } from '../../../../../../types/document';
import { EditBody } from './EditBody';

type EditDocState = 'loading' | 'loaded';

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Document | undefined>(undefined);
  const [viewDocState, setViewDocState] = useState<EditDocState>('loading');

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
