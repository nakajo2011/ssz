import * as React from 'react';

import {useAppDispatch} from '../store/hooks'
import {TextField, Box, MenuItem, InputLabel, Select, SelectChangeEvent, FormControl} from "@mui/material";
import {BasicTypeOptions} from "../store/basicTypeSlice";
import {changeBasicParam} from "../store/resultSlice";
import {useState} from "react";

export default function BasicTypeParams() {
    const dispatch = useAppDispatch()
    const [type_name, setTypeName] = useState("")
    const [value, setValue] = useState("20")

    const handleChangeType = (e: SelectChangeEvent) => {
        setTypeName(e.target.value)
        dispatchResult(e.target.value, value)
    }

    const handleChangeValue = (v: string) => {
        setValue(v)
        dispatchResult(type_name, v)
    }

    const dispatchResult = (type_name_str: string, value: string) => {
        const type_names = Object.values(BasicTypeOptions).filter((t) => type_name_str === t.toString())
        if(type_names.length > 0) {
            dispatch(changeBasicParam({type_name: type_names[0], value}))
        }
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
                    <MenuItem key="undefined" value=""><em>None</em></MenuItem>
                    {options}
                </Select>
                <TextField id="param_value" label="Value" variant="outlined"
                           value={value} onChange={e => handleChangeValue(e.target.value)}/>
            </FormControl>
        </Box>
    );
}
