'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { EditText, ReadOnlyText } from '../../../../components/blocks/text/Text';
import Typography from '@mui/material/Typography';
import { BlockTypes } from '../../../../models/blocks';
import {
  EditDielectric,
  ReadOnlyDielectric
} from '../../../../components/blocks/dielectric/DielectricPropsBodyTissues';
import { EditDrugHalfLife, ReadOnlyDrugHalfLife } from '../../../../components/blocks/drug-half-life/DrugHalfLife';
import axios from 'axios';
import { Tissue } from '../../../../components/blocks/dielectric/tissues';
import { Drug } from '../../../../components/blocks/drug-half-life/drugs';
import { Button } from '@mui/material';

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

const EditBody = ({ body, saveBodyChanges }: { body: string, saveBodyChanges: (newBody: string) => void }) => {
  const getBlocks = () => {
    return JSON.parse(body);
  }

  const saveTextChanges = (id: number, newBody: string) => {
    const blocks = getBlocks();
    blocks[id].text = newBody;
    saveBlocks(blocks);
  };

  const saveDielectricChanges = (id: number, newTissue: Tissue) => {
    const blocks = getBlocks();
    blocks[id].tissue = newTissue.name;
    saveBlocks(blocks);
  };

  const saveHalfLifeChanges = (index: number, newDrug: Drug, newDose: number) => {
    const blocks = getBlocks();
    blocks[index].drug = newDrug.name;
    blocks[index].dose = newDose;
    saveBlocks(blocks);
  };

  const saveBlocks = (blocks) => {
    let blocksString = JSON.stringify(blocks);
    saveBodyChanges(blocksString);
  };

  return (
    <>
      {getBlocks().map((block: any, index: number) => {
        if (block.type === 'text') {
          return <EditText key={index} value={block.text} saveChanges={(newBody) => saveTextChanges(index, newBody)}></EditText>;
        } else if (block.type === 'dielectric') {
          return <EditDielectric key={index} tissueName={block.tissue} saveChanges={(newTissue) => saveDielectricChanges(index, newTissue)}></EditDielectric>;
        } else if (block.type === 'half-life') {
          return <EditDrugHalfLife key={index} drugName={block.drug} dose={block.dose} saveChanges={(newDrug, newDose) => saveHalfLifeChanges(index, newDrug, newDose)}></EditDrugHalfLife>;
        }
      })}
    </>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Document | undefined>(undefined);
  const [viewDocState, setViewDocState] = useState<ViewDocState>('loading');

  useEffect(() => {
    axios<Document>(`http://localhost:8081/documents/${params.id}`)
      .then(response => {
        setData(response.data);
        setViewDocState('loaded');
      });
  }, []);

  const saveBodyChanges = (newBody: string) => {
    axios.put(`http://localhost:8081/documents/${params.id}`, {
      id: params.id,
      title: data!.title,
      body: newBody,
      state: 'ACTIVE'
    })
      .then(response => {
        setData(response.data);
        setViewDocState('loaded');
      });
  };

  return (
    <>
      {viewDocState === 'loading' && <p>Loading...</p>}
      {viewDocState === 'loaded' && data &&
        <>
          <Typography variant="h2">{data.title}</Typography>
          <p>Created: {data.createdDate} by User {data.creator} - Last modified: {data.modifiedDate} - {data.state}</p>
          <Button href={`/document/${params.id}`}>Publish Page</Button>
          <EditBody body={data.body} saveBodyChanges={saveBodyChanges}></EditBody>
        </>
      }
    </>
  );
}
