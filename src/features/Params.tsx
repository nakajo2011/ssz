import * as React from 'react';
import Title from './Title';

import {useLocation} from "react-router-dom";
import BasicTypeParams from "./BasicTypeParams";
import CompositeTypeParams from "./CompositeTypeParams";

export default function Params() {
    const location = useLocation()
    console.log(location.pathname)
    switch (location.pathname) {
        case "/":
            return (
                <React.Fragment>
                    <Title>SSZ Basic Types</Title>
                    <BasicTypeParams />
                </React.Fragment>
            )
        default:
            return (
                <React.Fragment>
                    <Title>SSZ Composit Types</Title>
                    <CompositeTypeParams />
                </React.Fragment>
            );

    }
}
