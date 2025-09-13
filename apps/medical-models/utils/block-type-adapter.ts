const blockTypeToString: Record<string, string> = {
  text: 'Text',
  'half-life': 'Half Life',
  dielectric: 'Dielectric Props.',
  image: 'Image',
};

export function getStringFromBlockType(blockType: string) {
  return blockTypeToString[blockType];
}
