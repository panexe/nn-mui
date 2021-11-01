import MenuBaseNode from "./MenuBaseNode";

import { DataBaseType } from "../../../../../../types";
import { NodeProps } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { ILayer, INNLib } from "../../../../../../adapters/INNLib";

export const createLayerNode = (
  lib: INNLib,
  layer: ILayer<any, any>,
  name: string
) => {
  return (props: NodeProps<DataBaseType>) => {
    return (
      <MenuBaseNode {...props} nnLib={lib} layer={layer} layerTypeName={name} />
    );
  };
};

export const createNode = (
  type: string,
  id: string,
  posX: number,
  posY: number,
  lib: INNLib
): Node<DataBaseType> | null => {
  // if node is not available
  if (lib.getAvailableLayerNames().includes(type) === false) {
    if (!(type === "input" || type === "output")) {
      return null;
    }
  }

  return {
    id: id,
    type: `${type}Node`,
    position: { x: posX, y: posY },
    dragHandle: ".drag-handle",
    data: {
      inputValue: undefined,
      outputValue: undefined,
      changed: true,
      error: "",
      layerName: type,
      lib: lib,
    },
  }; //as Node<DataBaseType>;
};
