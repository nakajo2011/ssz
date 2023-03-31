import * as React from 'react';
import Title from './Title';
import {useAppSelector} from "../store/hooks";
import {ByteDumpLine} from "./ByteDumpLine";
import {Buffer} from "buffer";

export default function NodeDetail() {
    const state = useAppSelector(state => state.nodeDetail)
    return (
      <React.Fragment>
          <Title>NodeDetail</Title>
          <ByteDumpLine subject='chunk data:' bytedata={new Buffer(state.value!, 'hex')}/>
      </React.Fragment>
    );
}
