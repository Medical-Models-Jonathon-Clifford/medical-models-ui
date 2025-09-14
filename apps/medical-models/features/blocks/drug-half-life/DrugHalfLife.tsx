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
  Tooltip as TooltipJs,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getConcentrations, getTimePoints } from './half-life-service';
import { halfLifeData, options } from './half-life-chart';
import { Drug, DRUG_HALF_LIVES, drugFromName } from './drugs';
import { IconButton, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TooltipJs,
  Legend
);

type EditDrugHalfLifeState = 'Loading' | 'Editing' | 'Viewing';

function halfLifeTitle(drug: Drug) {
  return `${drug.name} Half Life: ${drug.halfLife} hrs`;
}

function HalfLifeBox({ children }: { children: React.ReactNode }) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>{children}</Box>
    </Paper>
  );
}

function HalfLifeChart({ drug, dose }: { drug: Drug; dose: number }) {
  const timePoints: number[] = getTimePoints(drug);
  const concentrations: number[] = getConcentrations(drug, timePoints, dose);

  return (
    <Line
      options={options(drug.halfLife) as ChartOptions<'line'>}
      data={halfLifeData(timePoints, concentrations, drug, dose)}
    />
  );
}

export function ReadOnlyDrugHalfLife({
  drugName,
  dose,
}: {
  drugName: string;
  dose: number;
}) {
  const drug = drugFromName(drugName);

  return (
    <HalfLifeBox>
      <Typography variant="body1">{halfLifeTitle(drug)}</Typography>
      <Typography variant="body1">Dose: {dose} mg</Typography>
      <HalfLifeChart drug={drug} dose={dose}></HalfLifeChart>
    </HalfLifeBox>
  );
}

export function EditDrugHalfLife({
  drugName,
  dose,
  saveChanges,
  deleteBlock,
  moveUp,
  moveDown,
}: {
  drugName: string;
  dose: number;
  saveChanges: (newDrug: Drug, newDose: number) => void;
  deleteBlock: () => void;
  moveUp: () => void;
  moveDown: () => void;
}) {
  const drug = drugFromName(drugName);

  const [state, setState] = useState<EditDrugHalfLifeState>(
    drugName && dose ? 'Viewing' : 'Editing'
  );
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
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            width={'100%'}
          >
            <Box>
              <Typography variant="body1">{halfLifeTitle(drug)}</Typography>
              <Typography variant="body1">Dose: {dose} mg</Typography>
            </Box>
            <Box>
              <Tooltip title="Move up">
                <IconButton aria-label="up" onClick={moveUp}>
                  <ArrowUpwardOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Move down">
                <IconButton aria-label="down" onClick={moveDown}>
                  <ArrowDownwardOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit block">
                <IconButton aria-label="edit" onClick={clickEditHalfLife}>
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete block">
                <IconButton aria-label="delete" onClick={deleteBlock}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
          <HalfLifeChart drug={drug} dose={dose}></HalfLifeChart>
        </HalfLifeBox>
      )}
      {state === 'Editing' && (
        <HalfLifeBox>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            width={'100%'}
          >
            <Typography variant="body1">{halfLifeTitle(drug)}</Typography>
            <Tooltip title="Save block">
              <IconButton aria-label="save" onClick={clickSaveHalfLife}>
                <SaveOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
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
                  <MenuItem key={h.name} value={h.name}>
                    {h.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <input
                type="number"
                id="dose-input"
                value={inputDose}
                onChange={handleDoseChange}
                style={{
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  width: '100%',
                }}
              />
            </FormControl>
          </Stack>
          <HalfLifeChart drug={inputDrug} dose={inputDose}></HalfLifeChart>
        </HalfLifeBox>
      )}
    </>
  );
}
