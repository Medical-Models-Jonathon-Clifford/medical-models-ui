import { multiply, log, exp, range, MathNumericType } from 'mathjs';
import { Drug } from './drugs';

const NUM_POINTS = 500;
export const DEFAULT_DOSE = 10;

export function getTimePoints(drug: Drug): number[] {
  return linearSpace(0, drug.halfLife * 5);
}

export function getConcentrations(drug: Drug, timePoints: number[], dosage: number): number[] {
  const eliminationConstant = log(2) / drug.halfLife;
  return concentrationDecay(dosage, eliminationConstant, timePoints);
}

function intervals(end: number, start: number): number {
  return (end - start) / (NUM_POINTS - 1);
}

function linearSpace(start: number, end: number): number[] {
  const array = range(start, end, intervals(end, start), true).toArray();
  if (isMathNumericTypeArray(array) && isNumberArray(array)) {
    return array;
  } else {
    throw new Error('Unexpected type: Expected number[]');
  }
}

function isMathNumericTypeArray(input: MathNumericType[] | MathNumericType[][]): input is MathNumericType[] {
  return Array.isArray(input) && (input.length === 0 || !Array.isArray(input[0]));
}

function isNumberArray(n: MathNumericType[]): n is number[] {
  return Array.isArray(n) && n.map(isNumber).reduce((a, b) => a && b);
}

function isNumber(n: MathNumericType): n is number {
  return typeof n === 'number';
}

function concentrationDecay(defaultDose: number, eliminationConstant: number, time_points: number[]): number[] {
  return time_points.map((time: number) => {
    return defaultDose * exp(multiply(-eliminationConstant, time));
  });
}


