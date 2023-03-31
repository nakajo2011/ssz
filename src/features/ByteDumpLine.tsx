import {Box, BoxProps} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                display: 'inline',
                p: 1,
                m: 0,
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

const hex = (b: number) => b === undefined ? '' : '00'.substring(b.toString(16).length) + b.toString(16)

// Intersection Typeでattributeを追加した専用のpropsを定義
type ByteDumpLineProps = BoxProps & {
    subject: string,
    bytedata: ArrayBuffer,
}

export function ByteDumpLine(props: ByteDumpLineProps) {
    const {sx, ...other} = props
    const list = Array<JSX.Element>()
    const view = new Uint8Array(other.bytedata)
    view.forEach((b, index) => {
        list.push(<Item key={index}>{hex(b)}</Item>)
    })
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