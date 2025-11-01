import { blockTypeToStr } from './block-type-adapter';

describe('blockTypeToStr', () => {
  it.each`
    blockType       | expectedString
    ${'text'}       | ${'Text'}
    ${'half-life'}  | ${'Half Life'}
    ${'dielectric'} | ${'Dielectric Props.'}
    ${'image'}      | ${'Image'}
  `('should return a point', ({blockType, expectedString}) => {
    const blockString = blockTypeToStr(blockType);
    expect(blockString).toEqual(expectedString);
  });
});
