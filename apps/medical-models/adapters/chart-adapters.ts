import { Point } from 'chart.js';

export function zipToPoint(arr1: number[], arr2: number[]): Point[] {
  return arr1.map((element, index) => {
    return {
      x: element,
      y: arr2[index]
    };
  });
}
