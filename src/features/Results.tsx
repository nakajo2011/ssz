import * as React from 'react';
import Title from './Title';
import {Buffer} from 'buffer'; // for react
import {useAppSelector} from '../store/hooks'
import {Alert, Box, Stack} from "@mui/material";
import {ByteDumpLine} from "./ByteDumpLine";
import Typography from "@mui/material/Typography";

function renderKeyValueItem(key: string, value: string) {
return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
        }}
    >
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                width: '8rem',
            }}
        >
            <Typography sx={{
                color: 'primary.dark'
            }}>
                {key}
            </Typography>
        </Box>
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                p: 1,
            }}
        >
            {value}
        </Box>
    </Box>
)
}

export default function Results() {
    const state = useAppSelector(state => state.sszResult)
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
                    {renderKeyValueItem("chunk count", state.chunks!.length.toString())}
                </Box>
            </React.Fragment>
        );
    }
}
