import * as React from 'react';
import Title from './Title';
import BinaryTree from "./binary_tree/BinaryTree";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {nodeClicked} from "../store/nodeDetailSlice";

export default function Merklizes() {
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.sszResult)

    const handleNodeClick = (node: string) => {
        console.log('Node clicked:', node);
        dispatch(nodeClicked(node))
    };

    return (
      <React.Fragment>
          <Title>Merklizes</Title>
          <BinaryTree
              items={state.chunks ? [state.chunks] : [[]]}
              onNodeClick={handleNodeClick}/>
      </React.Fragment>
    );
}
