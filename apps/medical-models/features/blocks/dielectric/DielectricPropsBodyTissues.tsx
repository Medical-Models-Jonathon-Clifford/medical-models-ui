'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import {
  CategoryScale,
  Chart as ChartJS,
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
import { DEFAULT_TISSUE, Tissue, tissueFromName, TISSUES } from './tissues';
import { getFrequencies, getProperties } from './dielectric';
import {
  chartConductivityData,
  chartOptions,
  chartPermittivityData,
} from './dielectric-chart';
import {
  BlockPaper,
  DeleteBlock,
  EditBlock,
  MoveDown,
  MoveUp,
  SaveBlock,
} from '@mm/components/server';
import { EDITING, LoadEditViewState, VIEWING } from '@mm/types';

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

const conductivityOptions = chartOptions('Conductivity vs Frequency');
const permittivityOptions = chartOptions('Permittivity vs Frequency');

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
      <div style={{ width: '50%', height: '300px' }}>
        <Line options={permittivityOptions} data={permittivityData} />
      </div>
      <div style={{ width: '50%', height: '300px' }}>
        <Line options={conductivityOptions} data={conductivityData} />
      </div>
    </Stack>
  );
}

function DielectricBox({ children }: { children: React.ReactNode }) {
  return (
    <BlockPaper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {children}
      </Box>
    </BlockPaper>
  );
}

export function ReadOnlyDielectric({ tissueName }: { tissueName: string }) {
  const tissue = tissueFromName(tissueName);

  return (
    <DielectricBox>
      <Typography variant="body1">{dielectricTitle(tissue)}</Typography>
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
  const [state, setState] = useState<LoadEditViewState>(
    tissueName ? VIEWING : EDITING
  );

  const handleChange = (event: SelectChangeEvent) => {
    setTissue(tissueFromName(event.target.value));
  };

  const clickEditDielectric = () => {
    setState(EDITING);
  };

  const clickSaveDielectric = () => {
    if (tissue) {
      saveChanges(tissue);
    }
    setState(VIEWING);
  };

  if (state === VIEWING && tissue) {
    return (
      <DielectricBox>
        <Stack flexDirection="row" justifyContent="space-between" width="100%">
          <Typography variant="body1">{dielectricTitle(tissue)}</Typography>
          <Box>
            <MoveUp onClick={moveUp}></MoveUp>
            <MoveDown onClick={moveDown}></MoveDown>
            <EditBlock onClick={clickEditDielectric}></EditBlock>
            <DeleteBlock onClick={deleteBlock}></DeleteBlock>
          </Box>
        </Stack>
        <PermittivityAndConductivityCharts
          tissue={tissue}
        ></PermittivityAndConductivityCharts>
      </DielectricBox>
    );
  }

  if (state === EDITING) {
    const tissueOrDefault = tissue || DEFAULT_TISSUE;

    return (
      <DielectricBox>
        <Stack flexDirection="row" justifyContent="space-between" width="100%">
          <Typography variant="body1">
            {dielectricTitle(tissueOrDefault)}
          </Typography>
          <SaveBlock onClick={clickSaveDielectric} />
        </Stack>
        <FormControl>
          <InputLabel id="tissue-select-label">Tissue</InputLabel>
          <Select
            variant="filled"
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
