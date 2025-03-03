import { tissueFromName } from './tissues';

describe('tissues', () => {
  it.each`
    tissueName          | expectedTau2
    ${'Skin (Dry)'}     | ${32.481}
    ${'Skin (Wet)'}     | ${79.577}
    ${'Stomach'}        | ${79.577}
    ${'Vitreous Humor'} | ${159.155}
  `('should return the correct tissue for $tissueName', ({tissueName, expectedTau2}) => {
    let actual = tissueFromName(tissueName);
    expect(actual.name).toBe(tissueName);
    expect(actual.tau2).toBe(expectedTau2);
  });

  it.each`
    tissueName
    ${'Mud'}
    ${''}
    ${'Skin'}
    ${'Vitreous Humor Stomach'}
  `('should throw an error for tissues that do not exist', ({tissueName}) => {
    expect(() => tissueFromName(tissueName)).toThrow();
  });
});
