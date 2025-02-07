import {
  BlockType,
  isDielectricBlockType,
  isHalfLifeBlockType,
  isTextBlockType,
} from '../../../types/block';
import Typography from '@mui/material/Typography';
import styles from './page.module.scss';
import { ReadOnlyText } from '../../../features/blocks/text/Text';
import { ReadOnlyDielectric } from '../../../features/blocks/dielectric/DielectricPropsBodyTissues';
import { ReadOnlyDrugHalfLife } from '../../../features/blocks/drug-half-life/DrugHalfLife';
import * as React from 'react';

export function ReadOnlyBody({ body }: { body: string }) {
  const blocks: BlockType[] = JSON.parse(body);

  return (
    <>
      {!blocks && (
        <Typography className={styles.Placeholder}>
          The test for Addison&apos;s is always inconclusive. - Dr Gregory House
        </Typography>
      )}
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
          }
        })}
    </>
  );
}
