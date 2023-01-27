import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function Params() {
    return (
      <React.Fragment>
          <Title>SSZ Params</Title>
          <Typography display="block">
              type: Uint8
          </Typography>
          <Typography>
              value: 24
          </Typography>
      </React.Fragment>
    );
}
