import { Box, Button, Stack, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { ClosedHospitalDoors } from './ClosedHospitalDoorsSvgComponent';
import {
  borderColorLayoutLines,
  borderColorLayoutLinesHover,
  colorPrimary,
} from '@mm/tokens';

export function Forbidden() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{ width: '100%', padding: '16px' }}
    >
      <Box sx={{ height: '60%', maxHeight: '600px' }}>
        <ClosedHospitalDoors />
      </Box>

      <Typography variant="h4">{`Whoops! It seems you've wandered into a restricted area. We've checked your credentials, but you don't have access to this area.`}</Typography>

      <Button
        href="/"
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{
          color: 'white',
          backgroundColor: colorPrimary,
          textTransform: 'none',
          borderColor: borderColorLayoutLines,
          padding: '4px 12px',
          '&:hover': {
            backgroundColor: 'rgb(13,98,182)',
            borderColor: borderColorLayoutLinesHover,
          },
        }}
      >
        Take me home
      </Button>
    </Stack>
  );
}
