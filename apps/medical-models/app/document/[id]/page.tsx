'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { ReadOnlyText } from '../../../components/blocks/text/Text';
import Typography from '@mui/material/Typography';
import { BlockTypes } from '../../../models/blocks';
import { ReadOnlyDielectric } from '../../../components/blocks/dielectric/DielectricPropsBodyTissues';
import { ViewDrugHalfLife } from '../../../components/blocks/drug-half-life/DrugHalfLife';
import axios from 'axios';

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
  console.log('body');
  console.log(body);
  const blocks: BlockTypes[] = JSON.parse(body);

  return (
    <>
      {blocks.map((block: any) => {
        if (block.type === 'text') {
          return <ReadOnlyText key={block.id} text={block.text}></ReadOnlyText>;
        } else if (block.type === 'dielectric') {
          return <ReadOnlyDielectric key={block.id} tissueName={block.tissue}></ReadOnlyDielectric>;
        } else if (block.type === 'half-life') {
          return <ViewDrugHalfLife key={block.id} drugName={block.drug} dose={block.dose}></ViewDrugHalfLife>;
        }
      })}
    </>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Document | undefined>(undefined);
  const [viewDocState, setViewDocState] = useState<ViewDocState>('loading');

  useEffect(() => {
    axios<Document>(`http://localhost:8081/documents/${(params.id)}`)
      .then(response => {
        console.log('response');
        console.log(response);
        setData(response.data);
        setViewDocState('loaded');
      });
  }, []);

  return (
    <>
      {viewDocState === 'loading' && <p>Loading...</p>}
      {viewDocState === 'loaded' && data &&
        <>
          <Typography variant="h2">{data.title}</Typography>
          <p>Created: {data.createdDate} by User {data.creator} - Last modified: {data.modifiedDate} - {data.state}</p>
          <Body body={data.body}></Body>
        </>
      }
    </>
  );
}
