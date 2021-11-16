import MenuBaseNode from "./MenuBaseNode";

import { DataBaseType } from "../../../../../../types";
import { NodeProps } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { getNNLib, INNLib } from "../../../../../../adapters/INNLib";

const DenseNode = (props: NodeProps<DataBaseType>) => {
  const lib = getNNLib(props.data.libName);


  return (
    <MenuBaseNode
      {...props}
      libName={props.data.libName}
      layer={lib.dense}
      layerTypeName="dense"
    />
  );
};
export default DenseNode;

export const createDense = (
  id: string,
  posX: number,
  posY: number, 
  libName: string,
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
      libName: libName,
      isDragged: false, 
      dragOffset: 0,
    },
  }; //as Node<DataBaseTypse>;
};
