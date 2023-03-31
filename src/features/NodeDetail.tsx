import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {useAppSelector} from "../store/hooks";

export default function NodeDetail() {
    const state = useAppSelector(state => state.nodeDetail)
    return (
      <React.Fragment>
          <Title>NodeDetail</Title>
          <Typography>
              chunk: {state.value}
          </Typography>
      </React.Fragment>
    );
}
