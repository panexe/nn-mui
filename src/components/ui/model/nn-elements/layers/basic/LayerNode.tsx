import MenuBaseNode from "./MenuBaseNode";

import { DataBaseType } from "../../../../../../types";
import { NodeProps } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { getNNLib, ILayer } from "../../../../../../adapters/INNLib";

export const createLayerNode = (
  libName: string,
  layer: ILayer<any, any>,
  name: string
) => {
  return (props: NodeProps<DataBaseType>) => {
    return (
      <MenuBaseNode
        {...props}
        libName={libName}
        layer={layer}
        layerTypeName={name}
      />
    );
  };
};

export const createNode = (
  type: string,
  id: string,
  posX: number,
  posY: number,
  libName: string
): Node<DataBaseType> | null => {
  const lib = getNNLib(libName);

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
      libName: libName,
      isDragged: false, 
      dragOffset: 0,
    },
  }; //as Node<DataBaseType>;
};
