import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { TextField } from '@mui/material';
import { MouseEventHandler, useState } from 'react';
import Typography from '@mui/material/Typography';
import DielectricPropsBodyTissues from '../../../components/blocks/dielectric/DielectricPropsBodyTissues';
import DrugHalfLife from '../../../components/blocks/drug-half-life/DrugHalfLife';

type BlockState =
  'Choose Block'
  | 'Display Text Block'
  | 'Edit Text Block'
  | 'New Dielectric Block'
  | 'New Half Life Block';

export default function Block({ clickNewBlock }: { clickNewBlock: () => void }) {
  const [blockState, setBlockState] = useState<BlockState>('Choose Block');
  const [blockText, setBlockText] = useState('');

  const clickText: MouseEventHandler<HTMLButtonElement> = (event) => {
    setBlockState('Edit Text Block');
    clickNewBlock();
  };

  const clickDielectric: MouseEventHandler<HTMLButtonElement> = (event) => {
    setBlockState('New Dielectric Block');
    clickNewBlock();
  };

  const clickHalfLife: MouseEventHandler<HTMLButtonElement> = (event) => {
    setBlockState('New Half Life Block');
    clickNewBlock();
  };

  const clickSaveTextBlock: MouseEventHandler<HTMLButtonElement> = (event) => {
    setBlockState('Display Text Block');
  };

  const clickEditTextBlock: MouseEventHandler<HTMLButtonElement> = (event) => {
    setBlockState('Edit Text Block');
  };

  return (
    <>
      {blockState === 'Choose Block' && (
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Button variant="contained" onClick={clickText}>Text</Button>
            <Button variant="contained" onClick={clickDielectric}>Dielectric Properties</Button>
            <Button variant="contained" onClick={clickHalfLife}>Drug Half Lives</Button>
          </Box>
        </Paper>
      )}
      {blockState === 'Display Text Block' && (
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Typography variant="body1">{blockText}</Typography>
            <Button onClick={clickEditTextBlock}>Edit</Button>
          </Box>
        </Paper>
      )}
      {blockState === 'Edit Text Block' && (
        <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <TextField
              id="outlined-multiline-flexible"
              label="Multiline"
              multiline
              value={blockText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setBlockText(event.target.value);
              }}
            />
            <Button onClick={clickSaveTextBlock}>Save</Button>
          </Box>
        </Paper>
      )}
      {blockState === 'New Dielectric Block' && (
        <DielectricPropsBodyTissues></DielectricPropsBodyTissues>
      )}
      {blockState === 'New Half Life Block' && (
        <DrugHalfLife></DrugHalfLife>
      )}
    </>
  );
}
