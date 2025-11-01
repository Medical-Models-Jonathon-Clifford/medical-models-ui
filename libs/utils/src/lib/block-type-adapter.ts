import { ValidBlocks } from '@mm/types';

const blockTypeToString: Record<ValidBlocks, string> = {
  text: 'Text',
  'half-life': 'Half Life',
  dielectric: 'Dielectric Props.',
  image: 'Image',
};

export function blockTypeToStr(blockType: ValidBlocks) {
  return blockTypeToString[blockType];
}
