import  InputNode  from "./inputs/InputNode";
import  OutputNode  from "./outputs/OutputNode";
import { NodeTypesType } from "react-flow-renderer";
import BaseNode from "./basic/BaseNode";
//import DenseNode from "./basic/DenseFromBase";
import DenseNode from './basic/DenseNode';
import DropoutNode from "./basic/DropoutNode";
import { getNNLib, INNLib, TensorflowAdapter } from "../../../../../adapters/INNLib";
import { createLayerNode } from "./basic/LayerNode";

export { InputNode, OutputNode };




/**
 * This Object is neccesary for the react-flow component  
 */
export const getNodeTypes = (libName : string) => {
  const lib = getNNLib(libName);
  if(lib === undefined){
    console.log("cant find lib: ", libName);
    return [];
  }

  let ret: {[k: string]: any} = {
    inputNode: InputNode,
  outputNode: OutputNode,
  baseNode: BaseNode,

  }; //as NodeTypesType;
  lib.getAvailableLayers().map(({name, layer}) => {
    ret[`${name}Node`] = createLayerNode(libName, layer, name);
  })

  return ret;
};

export const nodesMenu = (lib: INNLib) => {
    return lib.getLayerMenu();
}