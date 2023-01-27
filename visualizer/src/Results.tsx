import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {Uint8} from "./lib/basic_type";

export default function Results() {
    const res = new Uint8(24)
    const hash_tree_root = res.hash_tree_root().toString('hex')
    return (
      <React.Fragment>
          <Title>SSZ Result</Title>
          <Typography>
              hash_tree_root: 0x{hash_tree_root}
          </Typography>
          <Typography>
              serialized: 0x{res.serialize().toString('hex')}
          </Typography>
      </React.Fragment>
    );
}
