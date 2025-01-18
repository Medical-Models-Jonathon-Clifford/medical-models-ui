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
  LogarithmicScale,
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
import { Button, Stack } from '@mui/material';
import { DEFAULT_TISSUE, Tissue, tissueFromName, TISSUES } from './tissues';
import { getFrequencies, getProperties } from './dielectric';
import { chartConductivityData, chartOptions, chartPermittivityData } from './dielectric-chart';
import Paper from '@mui/material/Paper';

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type EditDielectricState = 'Loading' | 'Editing' | 'Viewing';

const conductivityOptions = chartOptions('Conductivity vs Frequency') as ChartOptions<'line'>;
const permittivityOptions = chartOptions('Real Part of Permittivity vs Frequency') as ChartOptions<'line'>;

function calculatePermittivityAndConductivity(tissue: Tissue) {
  const frequencies = getFrequencies();
  const { epsilonReal, conductivity } = getProperties(tissue);
  const permittivityData = chartPermittivityData(frequencies, epsilonReal);
  const conductivityData = chartConductivityData(frequencies, conductivity);
  return { permittivityData, conductivityData };
}

function dielectricTitle(tissue: Tissue) {
  return `Dielectric Properties of: ${tissue.name}`;
}

function PermittivityAndConductivityCharts({ tissue }: { tissue: Tissue }) {
  const { permittivityData, conductivityData } = calculatePermittivityAndConductivity(tissue);

  return (
    <Stack direction="row" width={'100%'} spacing={'10px'}>
      <div className="chart-container" style={{ width: '50%', height: '300px' }}>
        <Line
          options={permittivityOptions}
          data={permittivityData}
        />
      </div>
      <div className="chart-container" style={{ width: '50%', height: '300px' }}>
        <Line
          options={conductivityOptions}
          data={conductivityData}
        />
      </div>
    </Stack>
  );
}

function DielectricBox({ children }: { children: React.ReactNode }) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {children}
      </Box>
    </Paper>
  );
}

export function ReadOnlyDielectric({ tissueName }: { tissueName: string }) {
  const tissue = tissueFromName(tissueName);

  return (
    <DielectricBox>
      <p>{dielectricTitle(tissue)}</p>
      <PermittivityAndConductivityCharts tissue={tissue}></PermittivityAndConductivityCharts>
    </DielectricBox>
  );
}

export function EditDielectric({ tissueName, saveChanges }: {
  tissueName: string,
  saveChanges: (newTissue: Tissue) => void
}) {
  const [tissue, setTissue] = useState<Tissue | undefined>(tissueName ? tissueFromName(tissueName) : undefined);
  const [state, setState] = useState<EditDielectricState>(tissueName ? 'Viewing' : 'Editing');

  const handleChange = (event: SelectChangeEvent) => {
    setTissue(tissueFromName(event.target.value));
  };

  const clickEditDielectric = () => {
    setState('Editing');
  };

  const clickSaveDielectric = () => {
    if (tissue) {
      saveChanges(tissue);
    }
    setState('Viewing');
  };

  if (state === 'Loading') {
    return (
      <DielectricBox>
        <p>Dielectric Properties...</p>
      </DielectricBox>
    );
  }

  if (state === 'Viewing' && tissue) {
    return (
      <DielectricBox>
        <p>{dielectricTitle(tissue)}</p>
        <Button onClick={clickEditDielectric}>Edit</Button>
        <PermittivityAndConductivityCharts tissue={tissue}></PermittivityAndConductivityCharts>
      </DielectricBox>
    );
  }

  if (state === 'Editing') {
    const tissueOrDefault = tissue || DEFAULT_TISSUE;

    return (
      <DielectricBox>
        <p>{dielectricTitle(tissueOrDefault)}</p>
        <FormControl>
          <InputLabel id="tissue-select-label">Tissue</InputLabel>
          <Select
            variant={'filled'}
            labelId="tissue-select-label"
            id="tissue-select"
            value={tissueOrDefault.name}
            label="Tissue"
            onChange={handleChange}
          >
            {TISSUES.map((h: Tissue) => (
              <MenuItem key={h.name} value={h.name}>{h.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={clickSaveDielectric}>Save</Button>
        <PermittivityAndConductivityCharts tissue={tissueOrDefault}></PermittivityAndConductivityCharts>
      </DielectricBox>
    );
  }
}
