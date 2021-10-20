import  InputNode  from "./inputs/InputNode";
import  OutputNode  from "./outputs/OutputNode";
import { NodeTypesType } from "react-flow-renderer";
import BaseNode from "./basic/BaseNode";
//import DenseNode from "./basic/DenseFromBase";
import DenseNode from './basic/DenseNode';

export { InputNode, OutputNode };

/**
 * This Object is neccesary for the react-flow component  
 */
export const nodeTypes: NodeTypesType = {
  inputNode: InputNode,
  outputNode: OutputNode,
  baseNode: BaseNode,
  denseNode: DenseNode, 
};

export const nodesMenu = {
    'basic':['dense', 'dropout'],
}