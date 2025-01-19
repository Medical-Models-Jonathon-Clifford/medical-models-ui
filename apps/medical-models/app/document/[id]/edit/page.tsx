'use client';

import * as React from 'react';
import { MouseEventHandler, useEffect, useState } from 'react';
import { EditText } from '../../../../components/blocks/text/Text';
import {
  BlockType,
  isDielectricBlockType,
  isHalfLifeBlockType,
  isTextBlockType,
} from '../../../../models/blocks';
import { EditDielectric } from '../../../../components/blocks/dielectric/DielectricPropsBodyTissues';
import { EditDrugHalfLife } from '../../../../components/blocks/drug-half-life/DrugHalfLife';
import {
  DEFAULT_TISSUE,
  Tissue,
} from '../../../../components/blocks/dielectric/tissues';
import {
  DEFAULT_DRUG,
  Drug,
} from '../../../../components/blocks/drug-half-life/drugs';
import { Button, Stack } from '@mui/material';
import { EditDocumentName } from '../../../../components/blocks/document-name/DocumentName';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DEFAULT_DOSE } from '../../../../components/blocks/drug-half-life/half-life-service';
import {
  getDocument,
  updateDocument,
} from '../../../../client/mm-document-client';

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

type EditBodyState = 'NoBody' | 'HasBody';

const EditBody = ({
  body,
  saveBodyChanges,
}: {
  body: string;
  saveBodyChanges: (newBody: string) => void;
}) => {
  const [editBodyState, setEditBodyState] = useState<EditBodyState>(
    body ? 'HasBody' : 'NoBody'
  );

  const getBlocks = (): BlockType[] => {
    console.log('body');
    console.log(body);
    return JSON.parse(body);
  };

  const saveTextChanges = (id: number, newBody: string) => {
    const blocks = getBlocks();
    if (isTextBlockType(blocks[id])) {
      blocks[id].text = newBody;
      saveBlocks(blocks);
    } else {
      throw new Error(
        'Received a new block that is not a text block. This should not happen.'
      );
    }
  };

  const saveDielectricChanges = (id: number, newTissue: Tissue) => {
    const blocks = getBlocks();
    if (isDielectricBlockType(blocks[id])) {
      blocks[id].tissue = newTissue.name;
      saveBlocks(blocks);
    }
  };

  const saveHalfLifeChanges = (
    index: number,
    newDrug: Drug,
    newDose: number
  ) => {
    const blocks = getBlocks();
    if (isHalfLifeBlockType(blocks[index])) {
      blocks[index].drug = newDrug.name;
      blocks[index].dose = newDose;
      saveBlocks(blocks);
    }
  };

  const saveBlocks = (blocks: BlockType[]) => {
    saveBodyChanges(JSON.stringify(blocks));
  };

  const clickText: MouseEventHandler<HTMLButtonElement> = (_) => {
    const newBlock: BlockType = {
      type: 'text',
      text: '',
    };
    saveNewBlock(newBlock);
  };

  const clickDielectric: MouseEventHandler<HTMLButtonElement> = (_) => {
    const newBlock: BlockType = {
      type: 'dielectric',
      tissue: DEFAULT_TISSUE.name,
    };
    saveNewBlock(newBlock);
  };

  const clickHalfLife: MouseEventHandler<HTMLButtonElement> = (_) => {
    const newBlock: BlockType = {
      type: 'half-life',
      drug: DEFAULT_DRUG.name,
      dose: DEFAULT_DOSE,
    };
    saveNewBlock(newBlock);
  };

  const saveNewBlock = (newBody: BlockType) => {
    if (body) {
      const blocks = getBlocks();
      blocks.push(newBody);
      saveBlocks(blocks);
    } else {
      saveBlocks([newBody]);
      setEditBodyState('HasBody');
    }
  };

  return (
    <>
      {editBodyState === 'NoBody' && (
        <>
          <p>Start solving problems by choosing a block below</p>
        </>
      )}
      {editBodyState === 'HasBody' &&
        getBlocks() &&
        getBlocks().map((block: BlockType, index: number) => {
          if (isTextBlockType(block)) {
            return (
              <EditText
                key={index}
                value={block.text}
                saveChanges={(newBody) => saveTextChanges(index, newBody)}
              ></EditText>
            );
          } else if (isDielectricBlockType(block)) {
            return (
              <EditDielectric
                key={index}
                tissueName={block.tissue}
                saveChanges={(newTissue) =>
                  saveDielectricChanges(index, newTissue)
                }
              ></EditDielectric>
            );
          } else if (isHalfLifeBlockType(block)) {
            return (
              <EditDrugHalfLife
                key={index}
                drugName={block.drug}
                dose={block.dose}
                saveChanges={(newDrug, newDose) =>
                  saveHalfLifeChanges(index, newDrug, newDose)
                }
              ></EditDrugHalfLife>
            );
          }
        })}
      <>
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Button variant="contained" onClick={clickText}>
              Text
            </Button>
            <Button variant="contained" onClick={clickDielectric}>
              Dielectric Properties
            </Button>
            <Button variant="contained" onClick={clickHalfLife}>
              Drug Half Lives
            </Button>
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
