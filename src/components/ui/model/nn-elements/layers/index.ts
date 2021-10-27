import  InputNode  from "./inputs/InputNode";
import  OutputNode  from "./outputs/OutputNode";
import { NodeTypesType } from "react-flow-renderer";
import BaseNode from "./basic/BaseNode";
//import DenseNode from "./basic/DenseFromBase";
import DenseNode from './basic/DenseNode';
import DropoutNode from "./basic/DropoutNode";

export { InputNode, OutputNode };




/**
 * This Object is neccesary for the react-flow component  
 */
export const nodeTypes: NodeTypesType = {
  inputNode: InputNode,
  outputNode: OutputNode,
  baseNode: BaseNode,
  denseNode: DenseNode, 
  dropoutNode: DropoutNode,
};

export const nodesMenu = {
    'basic':['dense', 'dropout'],
}