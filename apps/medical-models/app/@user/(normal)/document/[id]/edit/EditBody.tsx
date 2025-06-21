import * as React from 'react';
import { MouseEventHandler, useState } from 'react';
import {
  BlockType,
  isDielectricBlockType,
  isHalfLifeBlockType,
  isTextBlockType,
} from '../../../../../../types/block';
import {
  DEFAULT_TISSUE,
  Tissue,
} from '../../../../../../features/blocks/dielectric/tissues';
import {
  DEFAULT_DRUG,
  Drug,
} from '../../../../../../features/blocks/drug-half-life/drugs';
import { DEFAULT_DOSE } from '../../../../../../features/blocks/drug-half-life/half-life-service';
import { EditText } from '../../../../../../features/blocks/text/Text';
import { EditDielectric } from '../../../../../../features/blocks/dielectric/DielectricPropsBodyTissues';
import { EditDrugHalfLife } from '../../../../../../features/blocks/drug-half-life/DrugHalfLife';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

type EditBodyState = 'NoBody' | 'HasBody';

const DEFAULT_TEXT: BlockType = {
  type: 'text',
  text: '',
};

const DEFAULT_DIELECTRIC: BlockType = {
  type: 'dielectric',
  tissue: DEFAULT_TISSUE.name,
};

const DEFAULT_HALF_LIFE: BlockType = {
  type: 'half-life',
  drug: DEFAULT_DRUG.name,
  dose: DEFAULT_DOSE,
};

export function EditBody({
  body,
  saveBodyChanges,
}: {
  body: string;
  saveBodyChanges: (newBody: string) => void;
}) {
  const [editBodyState, setEditBodyState] = useState<EditBodyState>(
    body ? 'HasBody' : 'NoBody'
  );

  const getBlocks = (): BlockType[] => {
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
    saveNewBlock(DEFAULT_TEXT);
  };

  const clickDielectric: MouseEventHandler<HTMLButtonElement> = (_) => {
    saveNewBlock(DEFAULT_DIELECTRIC);
  };

  const clickHalfLife: MouseEventHandler<HTMLButtonElement> = (_) => {
    saveNewBlock(DEFAULT_HALF_LIFE);
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
}
