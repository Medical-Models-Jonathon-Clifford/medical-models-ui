'use client';

import * as React from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip
} from 'chart.js';
import DrugHalfLife from '../../components/drug-half-life/DrugHalfLife';
import DielectricPropsBodyTissues from '../../components/dielectric/DielectricPropsBodyTissues';

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Document() {

  return (
    <>
      <DielectricPropsBodyTissues></DielectricPropsBodyTissues>
      <DrugHalfLife></DrugHalfLife>
    </>
  );
}
