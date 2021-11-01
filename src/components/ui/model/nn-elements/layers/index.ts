import  InputNode  from "./inputs/InputNode";
import  OutputNode  from "./outputs/OutputNode";
import { NodeTypesType } from "react-flow-renderer";
import BaseNode from "./basic/BaseNode";
//import DenseNode from "./basic/DenseFromBase";
import DenseNode from './basic/DenseNode';
import DropoutNode from "./basic/DropoutNode";
import { INNLib } from "../../../../../adapters/INNLib";
import { createLayerNode } from "./basic/LayerNode";

export { InputNode, OutputNode };




/**
 * This Object is neccesary for the react-flow component  
 */
export const getNodeTypes = (lib : INNLib) => {
  let ret: {[k: string]: any} = {
    inputNode: InputNode,
  outputNode: OutputNode,
  baseNode: BaseNode,

  }; //as NodeTypesType;
  lib.getAvailableLayers().map(({name, layer}) => {
    ret[`${name}Node`] = createLayerNode(lib, layer, name);
  })

  return ret;
};

export const nodesMenu = {
    'basic':['dense', 'dropout'],
}