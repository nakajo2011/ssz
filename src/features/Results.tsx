import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {Uint8, Uint16} from "../lib/basic_type";

import { useAppSelector } from '../store/hooks'
import {RootState} from "../store";
import {Alert, Box, BoxProps, Stack} from "@mui/material";

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


function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                display: 'inline',
                p: 1,
                m: 0,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 1,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

const hex = (b: number) => b === undefined ? '' : '00'.substring(b.toString(16).length) + b.toString(16)

// Intersection Typeでattributeを追加した専用のpropsを定義
type ByteDumpLineProps = BoxProps & {
    subject: string,
    bytedata: ArrayBuffer,
}

function ByteDumpLine(props: ByteDumpLineProps) {
    const { sx, ...other} = props
    const list = Array<JSX.Element>()
    const view = new Uint8Array(other.bytedata)
    for(const b of view) {
        list.push(<Item>{hex(b)}</Item>)
    }
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
                    width: '128px',
                }}
            >
                <Typography sx={{
                    color: 'primary.dark'
                }}>
                    {other.subject}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    p: 1,
                }}
            >
                {list}
            </Box>
        </Box>
    )
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
        return (
            <React.Fragment>
                <Title>SSZ Result</Title>
                <Box>
                    <ByteDumpLine subject='hash_tree_root:' bytedata={res.hash_tree_root()}/>
                    <ByteDumpLine subject='serialize:' bytedata={res.serialize()}/>
                </Box>
            </React.Fragment>
        );
    }
}
