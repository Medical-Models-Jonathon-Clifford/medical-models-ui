import { add, chain, Complex, complex, divide, dotPow, i, multiply, pi, subtract } from 'mathjs';
import { Tissue } from './tissues';
import { isComplex } from './complex-type';

const EPSILON_0 = 8.854187817e-12;
const PICO_SECONDS = 1e-12;
const NANO_SECONDS = 1e-9;
const MICRO_SECONDS = 1e-6;
const MILLI_SECONDS = 1e-3;

export function getFrequencies() {
  return frequencies;
}

export function getProperties(tissue: Tissue) {
  const permittivity: Complex[] = angularFrequencies.map((angularFrequency) => fourColeCole(tissue, angularFrequency));
  const imaginary = permittivity.map(p => p.im);
  return {
    epsilonReal: permittivity.map(p => p.re),
    conductivity: imaginary.map((epIm, index) => angularFrequencies[index] * EPSILON_0 * epIm)
  };
}

const frequencies = logspace(1, Math.log10(10e6), 50); // From 10 Hz to 10 MHz
const angularFrequencies = frequencies.map(angularFrequency);

/**
 * Implementation of equation from this site:
 * http://niremf.ifac.cnr.it/docs/DIELECTRIC/AppendixC.html
 */
function fourColeCole(p: Tissue, omega: number): Complex {
  const result = chain(complex(p.ef))
    .add(divide(p.del1, jTauAlf(p.tau1 * PICO_SECONDS, p.alf1, omega)))
    .add(divide(p.del2, jTauAlf(p.tau2 * NANO_SECONDS, p.alf2, omega)))
    .add(divide(p.del3, jTauAlf(p.tau3 * MICRO_SECONDS, p.alf3, omega)))
    .add(divide(p.del4, jTauAlf(p.tau4 * MILLI_SECONDS, p.alf4, omega)))
    .add(divide(p.sig, multiply(i, omega, EPSILON_0)))
    .done();
  if (isComplex(result)) {
    return result;
  } else {
    throw new Error('Expected the result to be a Complex number.');
  }
}

function jTauAlf(tauI: number, alfI: number, omega: number) {
  return add(1, dotPow(multiply(i, omega, tauI), subtract(1, alfI)));
}

function angularFrequency(frequency: number): number {
  return multiply(frequency, pi, 2);
}

function logspace(start: number, stop: number, num: number) {
  const arr = [];
  const step = (stop - start) / (num - 1);
  for (let i = 0; i < num; i++) {
    arr.push(Math.pow(10, start + step * i));
  }
  return arr;
}

