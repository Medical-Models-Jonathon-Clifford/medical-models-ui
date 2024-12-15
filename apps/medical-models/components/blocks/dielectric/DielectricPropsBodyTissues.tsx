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
import { Stack } from '@mui/material';
import { DEFAULT_TISSUE, Tissue, tissueFromName, TISSUES } from './tissues';
import { getProperties, getFrequencies } from './dielectric';
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

export default function DielectricPropsBodyTissues() {
  const [tissue, setTissue] = useState(DEFAULT_TISSUE);

  const handleChange = (event: SelectChangeEvent) => {
    setTissue(tissueFromName(event.target.value));
  };

  const frequencies = getFrequencies();
  const { epsilonReal, conductivity } = getProperties(tissue);

  const conductivityOptions = chartOptions('Conductivity vs Frequency') as ChartOptions<'line'>;
  const permittivityOptions = chartOptions('Real Part of Permittivity vs Frequency') as ChartOptions<'line'>;
  const permittivityData = chartPermittivityData(frequencies, epsilonReal);
  const conductivityData = chartConductivityData(frequencies, conductivity);

  return (
    <>
      <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <p>Dielectric Properties of Body Tissues</p>
          <FormControl>
            <InputLabel id="tissue-select-label">Tissue</InputLabel>
            <Select
              variant={'filled'}
              labelId="tissue-select-label"
              id="tissue-select"
              value={tissue.name}
              label="Tissue"
              onChange={handleChange}
            >
              {TISSUES.map((h: Tissue) => (
                <MenuItem key={h.name} value={h.name}>{h.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
        </Box>
      </Paper>
    </>
  );
}

export function ReadOnlyDielectric({ tissueName }: { tissueName: string }) {

  const tissue = tissueFromName(tissueName);

  const frequencies = getFrequencies();
  const { epsilonReal, conductivity } = getProperties(tissue);

  const conductivityOptions = chartOptions('Conductivity vs Frequency') as ChartOptions<'line'>;
  const permittivityOptions = chartOptions('Real Part of Permittivity vs Frequency') as ChartOptions<'line'>;
  const permittivityData = chartPermittivityData(frequencies, epsilonReal);
  const conductivityData = chartConductivityData(frequencies, conductivity);

  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <p>Dielectric Properties of: {tissue.name}</p>
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
      </Box>
    </Paper>
  );
}
