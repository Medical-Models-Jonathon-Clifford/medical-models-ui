'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import {
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DEFAULT_DOSE, getConcentrations, getTimePoints } from './half-life-service';
import { halfLifeData, options } from './half-life-chart';
import { DEFAULT_DRUG, Drug, DRUG_HALF_LIVES, drugFromName } from './drugs';
import { useState } from 'react';
import { Stack } from '@mui/material';

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

export default function DrugHalfLife() {
  const [drug, setDrug] = useState(DEFAULT_DRUG);
  const [dose, setDose] = useState(DEFAULT_DOSE);

  const handleChange = (event: SelectChangeEvent) => {
    setDrug(drugFromName(event.target.value));
  };

  const handleDoseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDose(Number(e.target.value));
  };

  const timePoints: number[] = getTimePoints(drug);
  const concentrations: number[] = getConcentrations(drug, timePoints, dose);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <p>Document page</p>
        <Stack direction="row">
          <FormControl>
            <InputLabel id="drug-select-label">Drug</InputLabel>
            <Select
              variant={'filled'}
              labelId="drug-select-label"
              id="drug-select"
              value={drug.name}
              label="Drug"
              onChange={handleChange}
            >
              {DRUG_HALF_LIVES.map((h: Drug) => (
                <MenuItem key={h.name} value={h.name}>{h.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <input
              type="number"
              id="dose-input"
              value={dose}
              onChange={handleDoseChange}
              style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
            />
          </FormControl>
        </Stack>

        <p>{drug.name} Half Life: {drug.halfLife}</p>
        <Line
          options={options(drug.halfLife) as ChartOptions<'line'>}
          data={halfLifeData(timePoints, concentrations, drug, dose)}
        />
      </Box>
    </>
  );
}

export function ViewDrugHalfLife({drugName, dose}: {drugName: string, dose: number}) {

  const drug = drugFromName(drugName);

  const timePoints: number[] = getTimePoints(drug);
  const concentrations: number[] = getConcentrations(drug, timePoints, dose);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <p>{drug.name} Half Life: {drug.halfLife}</p>
        <Line
          options={options(drug.halfLife) as ChartOptions<'line'>}
          data={halfLifeData(timePoints, concentrations, drug, dose)}
        />
      </Box>
    </>
  );
}
