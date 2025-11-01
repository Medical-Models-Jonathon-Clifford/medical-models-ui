export const DEFAULT_COLOR = '#149bf1';

export function stringToColor(string?: string | null) {
  if (!string) {
    console.warn('Parameter `string` was null or undefined. Will default the return color.')
    return DEFAULT_COLOR;
  }

  let hash = 0;

  /* eslint-disable no-bitwise */
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
