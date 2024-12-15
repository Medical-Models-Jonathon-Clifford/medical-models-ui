type ValidBlocks = 'text' | 'dielectric' | 'halfLife';

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

export type HalfLifeBlockType = ValidTypes<'halfLife'> & ViewHalfLifeProps;

export type BlockTypes = TextBlockType | DielectricBlockType | HalfLifeBlockType;


