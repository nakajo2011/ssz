import * as React from 'react';

import {useAppSelector, useAppDispatch} from '../store/hooks'
import {TextField, Box, MenuItem, InputLabel, Select, SelectChangeEvent, FormControl} from "@mui/material";
import {changeType, changeValue, BasicTypeOptions} from "../store/basicTypeSlice";
import {changeBasicParam} from "../store/resultSlice";

export default function BasicTypeParams() {
    const type_name = useAppSelector(state => state.basic.type_name)
    const value = useAppSelector(state => state.basic.value)
    const dispatch = useAppDispatch()

    const handleChangeType = (e: SelectChangeEvent) => {
        const type_name = Object.values(BasicTypeOptions).filter((t) => e.target.value === t.toString())[0]
        dispatch(changeType(type_name))
        dispatch(changeBasicParam({type_name, value}))
    }

    const handleChangeValue = (v: string) => {
        dispatch(changeValue(v))
        dispatch(changeBasicParam({type_name, value: v}))
    }

    const options = Array<JSX.Element>()
    Object.values(BasicTypeOptions).forEach((o, index) => {
        options.push(<MenuItem key={index} value={o}>{o}</MenuItem>)
    })

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
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
                    {options}
                </Select>
                <TextField id="param_value" label="Value" variant="outlined"
                           value={value} onChange={e => handleChangeValue(e.target.value)}/>
            </FormControl>
        </Box>
    );
}
