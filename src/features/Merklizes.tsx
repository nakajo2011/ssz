import * as React from 'react';
import Title from './Title';
import BinaryTree from "./binary_tree/BinaryTree";
import {useState} from "react";

export default function Merklizes() {
    const [select_label, setSelectLabel] = useState("")

    const handleNodeClick = (node: any) => {
        console.log('Node clicked:', node);
        setSelectLabel(node)
    };

    return (
      <React.Fragment>
          <Title>Merklizes</Title>
          <BinaryTree
              items={[["hoge1", "hoge2"],[null, "hoge3", "hoge4", "hoge5"]]}
              onNodeClick={handleNodeClick}/>
          {select_label}
      </React.Fragment>
    );
}
