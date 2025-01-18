type ValidBlocks = 'text' | 'dielectric' | 'half-life';

type ValidTypes<T extends ValidBlocks> = {
  type: T;
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

export type BlockType = TextBlockType | DielectricBlockType | HalfLifeBlockType;

export function isTextBlockType(block: BlockType): block is TextBlockType {
  return block.type === 'text';
}

export function isDielectricBlockType(block: BlockType): block is DielectricBlockType {
  return block.type === 'dielectric';
}

export function isHalfLifeBlockType(block: BlockType): block is HalfLifeBlockType {
  return block.type === 'half-life';
}
