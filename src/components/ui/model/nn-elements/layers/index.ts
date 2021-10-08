import  InputNode  from "./inputs/InputNode";
import  DenseNode  from "./basic/DenseNode";
import  OutputNode  from "./outputs/OutputNode";
import { NodeTypesType } from "react-flow-renderer";

export { InputNode, DenseNode, OutputNode };

/**
 * This Object is neccesary for the react-flow component  
 */
export const nodeTypes: NodeTypesType = {
  inputNode: InputNode,
  outputNode: OutputNode,
  denseNode: DenseNode,
};
