import * as React from 'react';
import Title from './Title';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import {TextField, Box, MenuItem, InputLabel, Select, SelectChangeEvent, FormControl} from "@mui/material";
import {changeType, changeValue, TypeOptions} from "../store";

export default function Params() {
    const type_name = useAppSelector(state => state.type_name)
    const value = useAppSelector(state => state.value)
    const dispatch = useAppDispatch()

    const handleChangeType = (e: SelectChangeEvent) => {
        dispatch(changeType(Object.values(TypeOptions).filter((t) => e.target.value === t.toString())[0]))
    }

    const options = Array<JSX.Element>()
    Object.values(TypeOptions).forEach((o, index) => {
        options.push(<MenuItem key={index} value={o}>{o}</MenuItem>)
    })
    return (
      <React.Fragment>
          <Title>SSZ Basic Types</Title>
          <Box
              component="form"
              sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
          >
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type_name}
                      label="Type"
                      onChange={handleChangeType}
                  >
                      {/*<MenuItem value={TypeOptions.Uint8}>{TypeOptions.Uint8}</MenuItem>*/}
                      {/*<MenuItem value={TypeOptions.Uint16}>{TypeOptions.Uint16}</MenuItem>*/}
                      {options}
                  </Select>
                  <TextField id="param_value" label="Value" variant="outlined"
                             value={value} onChange={e => dispatch(changeValue(e.target.value))}/>
              </FormControl>
          </Box>
      </React.Fragment>
    );
}
