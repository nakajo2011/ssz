import * as React from 'react';
import Title from './Title';
import {Buffer} from 'buffer'; // for react
import {useAppSelector} from '../store/hooks'
import {Alert, Box, Stack} from "@mui/material";
import {ByteDumpLine} from "./ByteDumpLine";

export default function Results() {
    const state = useAppSelector(state => state.sszResult)
    console.log("state=", state)
    if(state.hash_tree_root === undefined) {
        return (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">invalid params. type: {state.errorMsg}</Alert>
            </Stack>
        )
    } else {
        return (
            <React.Fragment>
                <Title>SSZ Result</Title>
                <Box>
                    <ByteDumpLine subject='hash_tree_root:' bytedata={new Buffer(state.hash_tree_root, 'hex')}/>
                    <ByteDumpLine subject='serialize:' bytedata={new Buffer(state.serialize!, 'hex')}/>
                </Box>
            </React.Fragment>
        );
    }
}
