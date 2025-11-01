import { Point } from 'chart.js';
import { zip } from 'lodash-es';

export function zipToPoint(arr1: number[], arr2: number[]): Point[] {
  return zip(arr1, arr2)
    .filter(
      (pair): pair is [number, number] =>
        pair[0] !== undefined && pair[1] !== undefined
    )
    .map(([x, y]) => ({ x, y }));
}
