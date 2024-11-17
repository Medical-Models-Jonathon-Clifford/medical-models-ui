import { Complex, MathScalarType, MathType } from 'mathjs';

export function isComplex(n: MathType): n is Complex {
  return isMathScalarType(n) && isNotNumberOrBigInt(n) && hasComplexProperties(n);
}

function isMathScalarType(n: MathType): n is MathScalarType {
  return !Array.isArray(n);
}

function hasComplexProperties(n: Exclude<MathScalarType, number | bigint>): n is Complex {
  return 're' in n && 'im' in n;
}

function isNotNumberOrBigInt(n: MathScalarType): n is Exclude<MathScalarType, number | bigint> {
  return typeof n !== 'number' && typeof n !== 'bigint';
}
