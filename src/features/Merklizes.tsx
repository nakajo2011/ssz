import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {Graphviz} from 'graphviz-react';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BinaryTree from "./binary_tree/BinaryTree";

export default function Merklizes() {
    return (
      <React.Fragment>
          <Title>Merklize</Title>
          <Typography component="h1">
              TBD
          </Typography>
          <BinaryTree/>
          <Box sx={{
              width: "100px",
              height: "100px",
              background: "#ace7f2"}}>
              <Divider sx={{
                  transform: "rotate(135deg)",
                  width: 40,
                  border: 0,
                  "border-top": "1px solid #333",
                  mt: 1,
                  padding: 0,
                }}
              />
          </Box>
      </React.Fragment>
    );
}
