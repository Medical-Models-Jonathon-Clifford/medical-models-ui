'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { ReadOnlyDocumentName } from '../../../features/blocks/document-name/DocumentName';
import Divider from '@mui/material/Divider';
import { CommentPanel } from '../../../features/comments/components/CommentPanel';
import { getDocument } from '../../../client/mm-document-client';
import { ReadOnlyBody } from './ReadOnlyBody';

type Document = {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  modifiedDate: string;
  body: string;
  creator: string;
  state: string;
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
        <>
          <ReadOnlyDocumentName
            documentName={data.title}
          ></ReadOnlyDocumentName>
          <p>
            Created: {data.createdDate} by User {data.creator} - Last modified:{' '}
            {data.modifiedDate} - {data.state}
          </p>
          <Button href={`/document/${params.id}/edit`}>Edit Page</Button>
          <ReadOnlyBody body={data.body}></ReadOnlyBody>
          <Divider></Divider>
          <CommentPanel documentId={params.id}></CommentPanel>
        </>
      )}
    </>
  );
}
