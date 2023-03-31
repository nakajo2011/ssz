import * as React from 'react';
import Box from "@mui/material/Box";
import {BoxProps} from "@mui/material";

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                display: 'inline',
                width: 100,
                p: 1,
                m: 1,
                background: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
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

type ListItemProps = BoxProps & {
    items: Array<null | string>
}

function ListItem(props: ListItemProps) {
    const { sx, items, ...other } = props;
    const list = items.map((s) => {
        if(s === null) {
            return <Item sx={{border: "0px solid"}}/>
        } else {
            return <Item>{s}</Item>
        }
    })

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-around"
            }}
        >
            {list}
        </Box>
    );
}

export default function BinaryTree() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
            <ListItem items={["hoge", "hoge"]}/>
            <ListItem items={[null, "hoge", "hoge", "hoge"]}/>
        </Box>
    );
}
