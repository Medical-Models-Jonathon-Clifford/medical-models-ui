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
import { EditDrugHalfLife } from '../../components/blocks/drug-half-life/DrugHalfLife';
import { EditDielectric, ReadOnlyDielectric } from '../../components/blocks/dielectric/DielectricPropsBodyTissues';
import { DEFAULT_TISSUE } from '../../components/blocks/dielectric/tissues';

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
      <ReadOnlyDielectric tissueName={DEFAULT_TISSUE.name}></ReadOnlyDielectric>
      <EditDrugHalfLife></EditDrugHalfLife>
    </>
  );
}
