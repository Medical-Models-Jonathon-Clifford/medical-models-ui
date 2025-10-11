import { MouseEventHandler, useState } from 'react';
import {
  BlockType,
  isDielectricBlockType,
  isHalfLifeBlockType,
  isImageBlockType,
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
import { Box, Button, Paper } from '@mui/material';
import { EditImage } from '../../../../../../features/blocks/image/Image';

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

const DEFAULT_IMAGE: BlockType = {
  type: 'image',
  filename: 'd5a6c2f0-a04d-4833-8024-163788993430_placeholder-image-1.jpg',
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

  const saveImageChanges = (id: number, newFilename: string) => {
    const blocks = getBlocks();
    if (isImageBlockType(blocks[id])) {
      blocks[id].filename = newFilename;
      saveBlocks(blocks);
    } else {
      throw new Error(
        'Received a new block that is not an image block. This should not happen.'
      );
    }
  };

  const deleteBlock = (index: number) => {
    const blocks: BlockType[] = getBlocks();
    const newBlocks = blocks.filter((_, i) => i !== index);
    saveBlocks(newBlocks);
  };

  const moveUp = (index: number) => {
    const blocks: BlockType[] = getBlocks();
    if (index > 0) {
      // Swap the previous element with the current one
      [blocks[index - 1], blocks[index]] = [blocks[index], blocks[index - 1]];
      saveBlocks(blocks);
    }
  };

  const moveDown = (index: number) => {
    const blocks: BlockType[] = getBlocks();
    // Check if we're not at the last element
    if (index < blocks.length - 1) {
      // Swap the current element with the next one
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
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

  const clickImage: MouseEventHandler<HTMLButtonElement> = (_) => {
    saveNewBlock(DEFAULT_IMAGE);
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
                deleteBlock={() => deleteBlock(index)}
                moveUp={() => moveUp(index)}
                moveDown={() => moveDown(index)}
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
                deleteBlock={() => deleteBlock(index)}
                moveUp={() => moveUp(index)}
                moveDown={() => moveDown(index)}
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
                deleteBlock={() => deleteBlock(index)}
                moveUp={() => moveUp(index)}
                moveDown={() => moveDown(index)}
              ></EditDrugHalfLife>
            );
          } else if (isImageBlockType(block)) {
            return (
              <EditImage
                key={index}
                filename={block.filename}
                saveChanges={(newFilename) =>
                  saveImageChanges(index, newFilename)
                }
                deleteBlock={() => deleteBlock(index)}
                moveUp={() => moveUp(index)}
                moveDown={() => moveDown(index)}
              ></EditImage>
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
            <Button variant="contained" onClick={clickImage}>
              Image
            </Button>
          </Box>
        </Paper>
      </>
    </>
  );
}
