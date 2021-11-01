import { Elements, FlowElement } from "react-flow-renderer";
import { TensorflowAdapter } from "../../../../adapters/INNLib";
import { createDense } from "../nn-elements/layers/basic/DenseNode";
import { createDropout } from "../nn-elements/layers/basic/DropoutNode";
import { createNode } from "../nn-elements/layers/basic/LayerNode";
import { createInput } from "../nn-elements/layers/inputs/InputNode";
import { createOutput } from "../nn-elements/layers/outputs/OutputNode";
//import { createDropoutFromBase } from "../nn-elements/layers/basic/DropoutNode";

// setup elements, prob. move this to its own file
export const getInitialElements = () => {
  let ret: Elements = [];

  let newNode = createNode( "input","1", 240, 20, new TensorflowAdapter());
  if( newNode !== null){
    ret.push(newNode);
  }

  newNode = createNode("dense", "2", 360, 160, new TensorflowAdapter());
  if( newNode !== null){
    ret.push(newNode);
  }

  newNode = createNode("dense", "3", 460, 160, new TensorflowAdapter());
  if( newNode !== null){
    ret.push(newNode);
  }

  newNode = createNode("dropout", "4", 460, 160, new TensorflowAdapter());
  if( newNode !== null){
    ret.push(newNode);
  }

  newNode = createNode("output", "5", 460, 160, new TensorflowAdapter());
  if( newNode !== null){
    ret.push(newNode);
  }

  ret.push({
    id: "e2-3",
    source: "2",
    target: "3",
    type: "nnedge",
    style: { strokeWidth: 2 },
  });
  return ret;
};


    
  
