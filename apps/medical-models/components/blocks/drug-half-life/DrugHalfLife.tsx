'use client';

import * as React from 'react';
import { useState } from 'react';
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
import { getConcentrations, getTimePoints } from './half-life-service';
import { halfLifeData, options } from './half-life-chart';
import { Drug, DRUG_HALF_LIVES, drugFromName } from './drugs';
import { Button, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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

type EditDrugHalfLifeState = 'Loading' | 'Editing' | 'Viewing';

function halfLifeTitle(drug: Drug) {
  return `${drug.name} Half Life: ${drug.halfLife}`;
}

function HalfLifeBox({ children }: { children: React.ReactNode }) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {children}
      </Box>
    </Paper>
  );
}

function HalfLifeChart({ drug, dose }: { drug: Drug, dose: number }) {
  const timePoints: number[] = getTimePoints(drug);
  const concentrations: number[] = getConcentrations(drug, timePoints, dose);

  return (
    <Line
      options={options(drug.halfLife) as ChartOptions<'line'>}
      data={halfLifeData(timePoints, concentrations, drug, dose)}
    />
  );
}

export function ReadOnlyDrugHalfLife({ drugName, dose }: { drugName: string, dose: number }) {
  const drug = drugFromName(drugName);

  return (
    <HalfLifeBox>
      <Typography variant="body1">{halfLifeTitle(drug)}</Typography>
      <Typography variant="body1">Dose: {dose}</Typography>
      <HalfLifeChart drug={drug} dose={dose}></HalfLifeChart>
    </HalfLifeBox>
  );
}

export function EditDrugHalfLife({ drugName, dose, saveChanges }: {
  drugName: string,
  dose: number,
  saveChanges: (newDrug: Drug, newDose: number) => void
}) {
  const drug = drugFromName(drugName);

  const [state, setState] = useState<EditDrugHalfLifeState>(drugName && dose ? 'Viewing' : 'Editing');
  const [inputDrug, setInputDrug] = useState(drug);
  const [inputDose, setInputDose] = useState(dose);

  const handleChange = (event: SelectChangeEvent) => {
    setInputDrug(drugFromName(event.target.value));
  };

  const handleDoseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDose(Number(e.target.value));
  };

  const clickEditHalfLife = () => {
    setState('Editing');
  };

  const clickSaveHalfLife = () => {
    saveChanges(inputDrug, inputDose);
    setState('Viewing');
  };

  return (
    <>
      {state === 'Loading' && (
        <HalfLifeBox>
          <Typography variant="body1">Half life...</Typography>
        </HalfLifeBox>
      )}
      {state === 'Viewing' && (
        <HalfLifeBox>
          <Typography variant="body1">{halfLifeTitle(drug)}</Typography>
          <Typography variant="body1">Dose: {dose}</Typography>
          <Button onClick={clickEditHalfLife}>Edit</Button>
          <HalfLifeChart drug={drug} dose={dose}></HalfLifeChart>
        </HalfLifeBox>
      )}
      {state === 'Editing' && (
        <HalfLifeBox>
          <Typography variant="body1">{halfLifeTitle(drug)}</Typography>
          <Stack direction="row">
            <FormControl>
              <InputLabel id="drug-select-label">Drug</InputLabel>
              <Select
                variant={'filled'}
                labelId="drug-select-label"
                id="drug-select"
                value={inputDrug.name}
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
                value={inputDose}
                onChange={handleDoseChange}
                style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
              />
            </FormControl>
          </Stack>
          <Button onClick={clickSaveHalfLife}>Save</Button>
          <HalfLifeChart drug={inputDrug} dose={inputDose}></HalfLifeChart>
        </HalfLifeBox>
      )}
    </>
  );
}
