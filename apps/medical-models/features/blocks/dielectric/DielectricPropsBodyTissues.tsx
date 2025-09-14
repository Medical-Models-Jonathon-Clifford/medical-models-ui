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
  Tooltip as TooltipJS,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Stack } from '@mui/material';
import { DEFAULT_TISSUE, Tissue, tissueFromName, TISSUES } from './tissues';
import { getFrequencies, getProperties } from './dielectric';
import {
  chartConductivityData,
  chartOptions,
  chartPermittivityData,
} from './dielectric-chart';
import Paper from '@mui/material/Paper';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  TooltipJS,
  Legend
);

type EditDielectricState = 'Loading' | 'Editing' | 'Viewing';

const conductivityOptions = chartOptions(
  'Conductivity vs Frequency'
) as ChartOptions<'line'>;
const permittivityOptions = chartOptions(
  'Permittivity vs Frequency'
) as ChartOptions<'line'>;

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
  const { permittivityData, conductivityData } =
    calculatePermittivityAndConductivity(tissue);

  return (
    <Stack direction="row" width={'100%'} spacing={'10px'}>
      <div
        className="chart-container"
        style={{ width: '50%', height: '300px' }}
      >
        <Line options={permittivityOptions} data={permittivityData} />
      </div>
      <div
        className="chart-container"
        style={{ width: '50%', height: '300px' }}
      >
        <Line options={conductivityOptions} data={conductivityData} />
      </div>
    </Stack>
  );
}

function DielectricBox({ children }: { children: React.ReactNode }) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
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
      <PermittivityAndConductivityCharts
        tissue={tissue}
      ></PermittivityAndConductivityCharts>
    </DielectricBox>
  );
}

export function EditDielectric({
  tissueName,
  saveChanges,
  deleteBlock,
  moveUp,
  moveDown,
}: {
  tissueName: string;
  saveChanges: (newTissue: Tissue) => void;
  deleteBlock: () => void;
  moveUp: () => void;
  moveDown: () => void;
}) {
  const [tissue, setTissue] = useState<Tissue | undefined>(
    tissueName ? tissueFromName(tissueName) : undefined
  );
  const [state, setState] = useState<EditDielectricState>(
    tissueName ? 'Viewing' : 'Editing'
  );

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
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          width={'100%'}
        >
          <Typography>{dielectricTitle(tissue)}</Typography>
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
              <IconButton aria-label="edit" onClick={clickEditDielectric}>
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
        <PermittivityAndConductivityCharts
          tissue={tissue}
        ></PermittivityAndConductivityCharts>
      </DielectricBox>
    );
  }

  if (state === 'Editing') {
    const tissueOrDefault = tissue || DEFAULT_TISSUE;

    return (
      <DielectricBox>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          width={'100%'}
        >
          <p>{dielectricTitle(tissueOrDefault)}</p>
          <Tooltip title="Save block">
            <IconButton aria-label="save" onClick={clickSaveDielectric}>
              <SaveOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
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
              <MenuItem key={h.name} value={h.name}>
                {h.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <PermittivityAndConductivityCharts
          tissue={tissueOrDefault}
        ></PermittivityAndConductivityCharts>
      </DielectricBox>
    );
  }
}
