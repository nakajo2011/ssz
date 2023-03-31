import * as React from 'react';
import Box from "@mui/material/Box";
import {BoxProps, Typography} from "@mui/material";

type BinaryTreeProps = BoxProps & {
    items: (string | null)[][];
    onNodeClick?: (node: any) => void
}

type NodeProps = BoxProps & {
    value?: string
    onNodeClick?: (node: string|null) => void
}

function Node(props: NodeProps) {
    const { sx, value, onNodeClick, ...other } = props;
    const handleClick = () => {
        if (onNodeClick && value) {
            onNodeClick(value);
        }
    }
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
            onClick={handleClick}
            {...other}
        >
            <Typography align="center" variant="caption">
                {value}
            </Typography>
        </Box>
    );
}


function renderTree(items: (string|null)[][], handler?: (node: string|null) => void) {
    const list = items.map((nodes, index) => {
        const nlist = nodes.map((s, cindex) => {
            const keyId = "node"+index+"_"+cindex
            if(s === null) {
                return <Node sx={{border: "0px solid"}} key={keyId}/>
            } else {
                return <Node onNodeClick={handler} value={s} key={keyId}/>
            }
        })
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-around"
                }}
                key={"node_box_"+index}
            >
                {nlist}
            </Box>
        )
    })

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "space-around",
            }}
        >
            {list}
        </Box>
    );
}

export default function BinaryTree(props: BinaryTreeProps) {
    const { sx, items, onNodeClick, ...other } = props;
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
            {...other}
        >
            {renderTree(items, onNodeClick)}
        </Box>
    );
}
