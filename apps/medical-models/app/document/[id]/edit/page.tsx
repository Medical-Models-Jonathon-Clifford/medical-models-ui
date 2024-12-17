'use client';

import * as React from 'react';
import { MouseEventHandler, useEffect, useState } from 'react';
import { EditText } from '../../../../components/blocks/text/Text';
import { BlockTypes } from '../../../../models/blocks';
import { EditDielectric } from '../../../../components/blocks/dielectric/DielectricPropsBodyTissues';
import { EditDrugHalfLife } from '../../../../components/blocks/drug-half-life/DrugHalfLife';
import axios from 'axios';
import { DEFAULT_TISSUE, Tissue } from '../../../../components/blocks/dielectric/tissues';
import { DEFAULT_DRUG, Drug } from '../../../../components/blocks/drug-half-life/drugs';
import { Button, Stack } from '@mui/material';
import { EditDocumentName } from '../../../../components/blocks/document-name/DocumentName';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DEFAULT_DOSE } from '../../../../components/blocks/drug-half-life/half-life-service';

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

type EditDocState = 'loading' | 'loaded';

type EditBodyState = 'Loading' | 'NoBody' | 'HasBody';

const EditBody = ({ body, saveBodyChanges }: { body: string, saveBodyChanges: (newBody: string) => void }) => {
  const [editBodyState, setEditBodyState] = useState<EditBodyState>('Loading');

  useEffect(() => {
    if (body) {
      setEditBodyState('HasBody');
    } else {
      setEditBodyState('NoBody');
    }
  }, []);

  const getBlocks = () => {
    return JSON.parse(body);
  };

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

  const clickText: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newBlock = {
      type: 'text',
      text: ''
    };
    saveNewBlock(newBlock);
  };

  const clickDielectric: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newBlock = {
      type: 'dielectric',
      tissue: DEFAULT_TISSUE.name
    };
    saveNewBlock(newBlock);
  };

  const clickHalfLife: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newBlock = {
      type: 'half-life',
      drug: DEFAULT_DRUG.name,
      dose: DEFAULT_DOSE
    };
    saveNewBlock(newBlock);
  };

  const saveNewBlock = (newBody: BlockTypes) => {
    if (body) {
      const blocks = getBlocks();
      blocks.push(newBody);
      saveBlocks(blocks);
    } else {
      saveBlocks([newBody]);
      setEditBodyState('HasBody');
    }
  }

  return (
    <>
      {editBodyState === 'Loading' && <p>Loading...</p>}
      {editBodyState === 'NoBody' && (
        <>
          <p>Start solving problems by choosing a block below</p>
        </>

      )}
      {editBodyState === 'HasBody' && getBlocks() && getBlocks().map((block: any, index: number) => {
        if (block.type === 'text') {
          return <EditText key={index} value={block.text}
                           saveChanges={(newBody) => saveTextChanges(index, newBody)}></EditText>;
        } else if (block.type === 'dielectric') {
          return <EditDielectric key={index} tissueName={block.tissue}
                                 saveChanges={(newTissue) => saveDielectricChanges(index, newTissue)}></EditDielectric>;
        } else if (block.type === 'half-life') {
          return <EditDrugHalfLife key={index} drugName={block.drug} dose={block.dose}
                                   saveChanges={(newDrug, newDose) => saveHalfLifeChanges(index, newDrug, newDose)}></EditDrugHalfLife>;
        }
      })}
      <>
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Button variant="contained" onClick={clickText}>Text</Button>
            <Button variant="contained" onClick={clickDielectric}>Dielectric Properties</Button>
            <Button variant="contained" onClick={clickHalfLife}>Drug Half Lives</Button>
          </Box>
        </Paper>
      </>
    </>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Document | undefined>(undefined);
  const [viewDocState, setViewDocState] = useState<EditDocState>('loading');

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

  const saveDocumentNameChanges = (newName: string) => {
    axios.put(`http://localhost:8081/documents/${params.id}`, {
      id: params.id,
      title: newName,
      body: data!.body,
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
          <Stack>
            <EditDocumentName documentName={data.title} saveChanges={saveDocumentNameChanges}></EditDocumentName>
          </Stack>
          <p>Created: {data.createdDate} by User {data.creator} - Last modified: {data.modifiedDate} - {data.state}</p>
          <Button href={`/document/${params.id}`}>Publish Page</Button>
          <EditBody body={data.body} saveBodyChanges={saveBodyChanges}></EditBody>
        </>
      }
    </>
  );
}
