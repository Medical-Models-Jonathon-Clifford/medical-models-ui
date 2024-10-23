import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Recent() {
  return (
    <React.Fragment>
      <Title>Recent Models</Title>
      <div>
      </div>
    </React.Fragment>
  );
}
