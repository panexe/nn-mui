import  InputNode  from "./inputs/InputNode";
import  OutputNode  from "./outputs/OutputNode";
import { NodeTypesType } from "react-flow-renderer";
import BaseNode from "./basic/BaseNode";

export { InputNode, OutputNode };

/**
 * This Object is neccesary for the react-flow component  
 */
export const nodeTypes: NodeTypesType = {
  inputNode: InputNode,
  outputNode: OutputNode,
  baseNode: BaseNode,
};

export const nodesMenu = {
    'basic':['dense', 'dropout'],
}