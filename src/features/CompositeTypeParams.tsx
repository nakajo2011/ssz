import * as React from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import {TextField, Box, MenuItem, InputLabel, Select, SelectChangeEvent, FormControl} from "@mui/material";
import {changeCompositeType, changeBasicType, changeValue, BasicTypeOptions, CompositeTypeOptions} from "../store/compositeTypeSlice";

export default function CompositeTypeParams() {
    const composite_type_name = useAppSelector(state => state.composite.composite_type_name)
    const basic_type_name = useAppSelector(state => state.composite.basic_type_name)
    const value = useAppSelector(state => state.composite.value)

    const dispatch = useAppDispatch()

    const handleChangeCompositeType = (e: SelectChangeEvent) => {
        dispatch(changeCompositeType(Object.values(CompositeTypeOptions).filter((t) => e.target.value === t.toString())[0]))
    }

    const handleChangeBasicType = (e: SelectChangeEvent) => {
        dispatch(changeBasicType(Object.values(BasicTypeOptions).filter((t) => e.target.value === t.toString())[0]))
    }

    const compositeOptions = Array<JSX.Element>()
    const basicOptions = Array<JSX.Element>()
    Object.values(CompositeTypeOptions).forEach((o, index) => {
        compositeOptions.push(<MenuItem key={index} value={o}>{o}</MenuItem>)
    })
    Object.values(BasicTypeOptions).forEach((o, index) => {
        basicOptions.push(<MenuItem key={index} value={o}>{o}</MenuItem>)
    })

    return (
          <Box
              component="form"
              sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
          >
              <FormControl fullWidth
                           sx={{
                               m: 1
                           }}>
                  <InputLabel id="composite-type-select-label">Composite Type</InputLabel>
                  <Select
                      labelId="composite-type-select-label"
                      id="composite-type-select"
                      value={composite_type_name}
                      label="Composite Type"
                      onChange={handleChangeCompositeType}
                  >
                      {compositeOptions}
                  </Select>
              </FormControl>
              <FormControl fullWidth
                           sx={{
                               m: 1
                           }}>
                  <InputLabel id="inner-type-select-label">Inner Type</InputLabel>
                  <Select
                      labelId="inner-type-select-label"
                      id="inner-type-select"
                      value={basic_type_name}
                      label="Inner Type"
                      onChange={handleChangeBasicType}
                  >
                      {basicOptions}
                  </Select>
              </FormControl>
              <FormControl fullWidth>
              <TextField id="param_value" label="Value" variant="outlined"
                         value={value} onChange={e => dispatch(changeValue(e.target.value))}/>
              </FormControl>
          </Box>
    );
}
