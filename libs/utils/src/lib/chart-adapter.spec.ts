import { zipToPoint } from './chart-adapter';
import { Point } from 'chart.js';

describe('zipToPoint', () => {
  it('should return a point', () => {
    const points = zipToPoint([1], [2]);
    expect(points).toEqual([{x: 1, y: 2}]);
  });

  it('should create points from two arrays of equal length', () => {
    const x = [1, 2, 3];
    const y = [4, 5, 6];
    const expected: Point[] = [
      { x: 1, y: 4 },
      { x: 2, y: 5 },
      { x: 3, y: 6 }
    ];

    expect(zipToPoint(x, y)).toEqual(expected);
  });

  it('should handle empty arrays', () => {
    expect(zipToPoint([], [])).toEqual([]);
  });

  it('should handle arrays with single elements', () => {
    const expected: Point[] = [{ x: 1, y: 2 }];
    expect(zipToPoint([1], [2])).toEqual(expected);
  });

  it('should handle decimal numbers', () => {
    const x = [1.5, 2.7];
    const y = [3.2, 4.9];
    const expected: Point[] = [
      { x: 1.5, y: 3.2 },
      { x: 2.7, y: 4.9 }
    ];

    expect(zipToPoint(x, y)).toEqual(expected);
  });

  it('should handle negative numbers', () => {
    const x = [-1, -2];
    const y = [-3, -4];
    const expected: Point[] = [
      { x: -1, y: -3 },
      { x: -2, y: -4 }
    ];

    expect(zipToPoint(x, y)).toEqual(expected);
  });

  it('should handle mixed positive and negative numbers', () => {
    const x = [-1, 2];
    const y = [3, -4];
    const expected: Point[] = [
      { x: -1, y: 3 },
      { x: 2, y: -4 }
    ];

    expect(zipToPoint(x, y)).toEqual(expected);
  });

  it('should handle arrays of different lengths', () => {
    const x = [1, 2, 3];
    const y = [4, 5];
    const expected: Point[] = [
      { x: 1, y: 4 },
      { x: 2, y: 5 }
    ];

    expect(zipToPoint(x, y)).toEqual(expected);
  });

  it('should handle zero values', () => {
    const x = [0, 1, 0];
    const y = [1, 0, 0];
    const expected: Point[] = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 0 }
    ];

    expect(zipToPoint(x, y)).toEqual(expected);
  });

  it('should handle very large numbers', () => {
    const x = [1e10, 2e10];
    const y = [3e10, 4e10];
    const expected: Point[] = [
      { x: 1e10, y: 3e10 },
      { x: 2e10, y: 4e10 }
    ];

    expect(zipToPoint(x, y)).toEqual(expected);
  });

});
