'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { ReadOnlyText } from '../../../components/blocks/text/Text';
import { BlockTypes } from '../../../models/blocks';
import { ReadOnlyDielectric } from '../../../components/blocks/dielectric/DielectricPropsBodyTissues';
import { ReadOnlyDrugHalfLife } from '../../../components/blocks/drug-half-life/DrugHalfLife';
import { Button } from '@mui/material';
import { ReadOnlyDocumentName } from '../../../components/blocks/document-name/DocumentName';
import Divider from '@mui/material/Divider';
import { Comments } from '../../../components/comments/Comments';
import { getDocument } from '../../../client/medical-models-client';
import Typography from '@mui/material/Typography';
import styles from './page.module.scss';

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

const Body = ({ body }: { body: string }) => {
  const blocks: BlockTypes[] = JSON.parse(body);

  return (
    <>
      {!blocks && <Typography className={styles.Placeholder}>The test for Addison's is always inconclusive. - Dr Gregory House</Typography>}
      {blocks && blocks.map((block: any, index: number) => {
        if (block.type === 'text') {
          return <ReadOnlyText key={index} text={block.text}></ReadOnlyText>;
        } else if (block.type === 'dielectric') {
          return <ReadOnlyDielectric key={index} tissueName={block.tissue}></ReadOnlyDielectric>;
        } else if (block.type === 'half-life') {
          return <ReadOnlyDrugHalfLife key={index} drugName={block.drug} dose={block.dose}></ReadOnlyDrugHalfLife>;
        }
      })}
    </>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Document | undefined>(undefined);
  const [viewDocState, setViewDocState] = useState<ViewDocState>('loading');

  useEffect(() => {
    getDocument(params.id)
      .then(response => {
        setData(response.data);
        setViewDocState('loaded');
      });
  }, []);

  return (
    <>
      {viewDocState === 'loading' && <p>Loading...</p>}
      {viewDocState === 'loaded' && data &&
        <>
          <ReadOnlyDocumentName documentName={data.title}></ReadOnlyDocumentName>
          <p>Created: {data.createdDate} by User {data.creator} - Last modified: {data.modifiedDate} - {data.state}</p>
          <Button href={`/document/${params.id}/edit`}>Edit Page</Button>
          <Body body={data.body}></Body>
          <Divider></Divider>
          <Comments documentId={params.id}></Comments>
        </>
      }
    </>
  );
}
