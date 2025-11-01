import { DEFAULT_COLOR, stringToColor } from './str-to-color';

describe('String to Color Adapter', () => {

  it.each`
    string                 | expectedColor
    ${'John Smith'}        | ${'#ae5cae'}
    ${'Dr. Lisa Cuddy'}    | ${'#522989'}
    ${'Dr. Gregory House'} | ${'#2996fd'}
    ${'Radar'}             | ${'#e622b1'}
    ${'Zachariah Andrews'} | ${'#79c526'}
  `('$string should convert to the color $expectedColor', ({string, expectedColor}) => {
    const color = stringToColor(string);
    expect(color).toEqual(expectedColor);
  });

  it.each`
    string       | expectedColor
    ${null}      | ${DEFAULT_COLOR}
    ${undefined} | ${DEFAULT_COLOR}
  `('should return default value when passed null', ({string, expectedColor}) => {
    const color = stringToColor(string);
    expect(color).toEqual(expectedColor);
  });
});
