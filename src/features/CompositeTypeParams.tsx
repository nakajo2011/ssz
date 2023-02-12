import * as React from 'react';

import { useAppSelector, useAppDispatch } from '../store/hooks'
import {TextField, Box, MenuItem, InputLabel, Select, SelectChangeEvent, FormControl} from "@mui/material";
import {changeCompositeType, changeBasicType, changeValue, CompositeTypeOptions} from "../store/compositeTypeSlice";
import {BasicTypeOptions} from "../store/basicTypeSlice";
import {changeCompositeParam} from "../store/resultSlice";

export default function CompositeTypeParams() {
    const composite_type_name = useAppSelector(state => state.composite.composite_type_name)
    const basic_type_name = useAppSelector(state => state.composite.basic_type_name)
    const value = useAppSelector(state => state.composite.value)

    const dispatch = useAppDispatch()

    const handleChangeCompositeType = (e: SelectChangeEvent) => {
        const composite_type_name = Object.values(CompositeTypeOptions).filter((t) => e.target.value === t.toString())[0]
        dispatch(changeCompositeType(composite_type_name))
        dispatch(changeCompositeParam({composite_type_name, basic_type_name, value}))
    }

    const handleChangeBasicType = (e: SelectChangeEvent) => {
        const basic_type_name = Object.values(BasicTypeOptions).filter((t) => e.target.value === t.toString())[0]
        dispatch(changeBasicType(basic_type_name))
        dispatch(changeCompositeParam({composite_type_name, basic_type_name, value}))
    }

    const handleChangeValue = (v: string) => {
        dispatch(changeValue(v))
        dispatch(changeCompositeParam({composite_type_name, basic_type_name, value: v}))
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
                         value={value} onChange={e => handleChangeValue(e.target.value)}/>
              </FormControl>
          </Box>
    );
}
