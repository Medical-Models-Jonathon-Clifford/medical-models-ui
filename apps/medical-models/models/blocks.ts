type ValidBlocks = 'text' | 'dielectric' | 'half-life';

export type ValidTypes<ValidBlocks> = {
  type: string;
}

export type ViewTextProps = {
  text: string;
}

export type ViewDielectricProps = {
  tissue: string;
}

export type ViewHalfLifeProps = {
  drug: string;
  dose: number;
}

export type TextBlockType = ValidTypes<'text'> & ViewTextProps;

export type DielectricBlockType = ValidTypes<'dielectric'> & ViewDielectricProps;

export type HalfLifeBlockType = ValidTypes<'half-life'> & ViewHalfLifeProps;

export type BlockTypes = TextBlockType | DielectricBlockType | HalfLifeBlockType;

export function isTextBlockType(block: BlockTypes): block is TextBlockType {
  return block.type === 'text';
}

export function isDielectricBlockType(block: BlockTypes): block is DielectricBlockType {
  return block.type === 'dielectric';
}

export function isHalfLifeBlockType(block: BlockTypes): block is HalfLifeBlockType {
  return block.type === 'half-life';
}


