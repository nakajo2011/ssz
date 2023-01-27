import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {Uint8, Uint16} from "../lib/basic_type";

import { useAppSelector } from '../store/hooks'
import {RootState} from "../store";
import {Alert, Stack} from "@mui/material";

const factory = (state: RootState) => {
    try {
        switch (state.type_name) {
            case "Uint8":
                return new Uint8(parseInt(state.value))
            case "Uint16":
                return new Uint16(parseInt(state.value))
            default:
                return undefined
        }
    } catch (e) {
        console.error(e)
        return undefined
    }
}
export default function Results() {
    const state = useAppSelector(state => state)
    const res = factory(state)
    if(res == undefined) {
        return (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">invalid params. type: {state.type_name}, value: {state.value}</Alert>
            </Stack>
        )
    } else {
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
}
