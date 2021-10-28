import MenuBaseNode from "./MenuBaseNode";

import { DataBaseType } from "../../../../../../types";
import { NodeProps } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { INNLib, TensorflowAdapter } from "../../../../../../adapters/INNLib";

const DenseNode = (props: NodeProps<DataBaseType>) => {
  return (
    <MenuBaseNode
      {...props}
      nnLib={props.data.lib}
      layer={props.data.lib.dense}
      layerTypeName="dense"
    />
  );
};
export default DenseNode;

export const createDense = (
  id: string,
  posX: number,
  posY: number, 
  lib: INNLib,
): Node<DataBaseType> => {
  return {
    id: id,
    type: "denseNode",
    position: { x: posX, y: posY },
    dragHandle: ".drag-handle",
    data: {
      inputValue: undefined,
      outputValue: undefined,
      changed: true,
      error: "",
      layerName: "dense",
      lib: lib,
    },
  }; //as Node<DataBaseType>;
};
