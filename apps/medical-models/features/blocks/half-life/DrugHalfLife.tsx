'use client';

import * as React from 'react';
import { ReactNode, useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { SaveOutlined as SaveOutlinedIcon } from '@mui/icons-material';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip as TooltipJs,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getConcentrations, getTimePoints } from './half-life-service';
import { halfLifeData, options } from './half-life-chart';
import { Drug, DRUG_HALF_LIVES, drugFromName } from './drugs';
import { MoveUp } from '../../../components/block-buttons/MoveUp';
import { MoveDown } from '../../../components/block-buttons/MoveDown';
import { EditBlock } from '../../../components/block-buttons/EditBlock';
import { DeleteBlock } from '../../../components/block-buttons/DeleteBlock';
import { EDITING, LoadEditViewState, VIEWING } from '../../../types/states';

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

function halfLifeTitle(drug: Drug) {
  return `${drug.name} Half Life: ${drug.halfLife} hrs`;
}

function HalfLifeBox({ children }: { children: ReactNode }) {
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
      options={options(drug.halfLife)}
      data={halfLifeData(timePoints, concentrations, drug, dose)}
    />
  );
}

export function ReadOnlyHalfLife({
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

export function EditHalfLife({
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

  const [state, setState] = useState<LoadEditViewState>(
    drugName && dose ? VIEWING : EDITING
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
    setState(EDITING);
  };

  const clickSaveHalfLife = () => {
    saveChanges(inputDrug, inputDose);
    setState(VIEWING);
  };

  return (
    <>
      {state === VIEWING && (
        <HalfLifeBox>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
          >
            <Box>
              <Typography variant="body1">{halfLifeTitle(drug)}</Typography>
              <Typography variant="body1">Dose: {dose} mg</Typography>
            </Box>
            <Box>
              <MoveUp onClick={moveUp}></MoveUp>
              <MoveDown onClick={moveDown}></MoveDown>
              <EditBlock onClick={clickEditHalfLife}></EditBlock>
              <DeleteBlock onClick={deleteBlock}></DeleteBlock>
            </Box>
          </Stack>
          <HalfLifeChart drug={drug} dose={dose}></HalfLifeChart>
        </HalfLifeBox>
      )}
      {state === EDITING && (
        <HalfLifeBox>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
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
                variant="filled"
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
