import { Box } from '@mui/material';
import {
  BlockType,
  isDielectricBlockType,
  isHalfLifeBlockType,
  isImageBlockType,
  isTextBlockType,
} from '../../../../../types/block';
import { ReadOnlyText } from '../../../../../features/blocks/text/Text';
import { ReadOnlyDielectric } from '../../../../../features/blocks/dielectric/DielectricPropsBodyTissues';
import { ReadOnlyDrugHalfLife } from '../../../../../features/blocks/drug-half-life/DrugHalfLife';
import { ReadOnlyImage } from '../../../../../features/blocks/image/Image';

export function ReadOnlyBody({ body }: { body: string }) {
  const blocks: BlockType[] = JSON.parse(body);

  return (
    <>
      {!blocks && <Box sx={{ height: '150px' }}></Box>}
      {blocks &&
        blocks.map((block: BlockType, index: number) => {
          if (isTextBlockType(block)) {
            return <ReadOnlyText key={index} text={block.text}></ReadOnlyText>;
          } else if (isDielectricBlockType(block)) {
            return (
              <ReadOnlyDielectric
                key={index}
                tissueName={block.tissue}
              ></ReadOnlyDielectric>
            );
          } else if (isHalfLifeBlockType(block)) {
            return (
              <ReadOnlyDrugHalfLife
                key={index}
                drugName={block.drug}
                dose={block.dose}
              ></ReadOnlyDrugHalfLife>
            );
          } else if (isImageBlockType(block)) {
            return (
              <ReadOnlyImage
                key={index}
                filename={block.filename}
              ></ReadOnlyImage>
            );
          }
        })}
    </>
  );
}
