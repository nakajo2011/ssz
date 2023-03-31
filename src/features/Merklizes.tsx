import * as React from 'react';
import Title from './Title';
import BinaryTree from "./binary_tree/BinaryTree";
import {useAppDispatch} from "../store/hooks";
import {nodeClicked} from "../store/nodeDetailSlice";

export default function Merklizes() {
    const dispatch = useAppDispatch()

    const handleNodeClick = (node: string) => {
        console.log('Node clicked:', node);
        dispatch(nodeClicked(node))
    };

    return (
      <React.Fragment>
          <Title>Merklizes</Title>
          <BinaryTree
              items={[["hoge1", "hoge2"],[null, "hoge3", "hoge4", "hoge5"]]}
              onNodeClick={handleNodeClick}/>
      </React.Fragment>
    );
}
