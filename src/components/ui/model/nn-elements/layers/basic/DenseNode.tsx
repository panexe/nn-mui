import { BaseNodeProps } from "./BaseNode";
import MenuBaseNode from "./MenuBaseNode";
import {
  Dense,
  DenseLayerArgs,
} from "@tensorflow/tfjs-layers/dist/layers/core";
import {
  DataBaseType,
  layerOutput,
  OptionTypes,
} from "../../../../../../types";
import { NodeProps } from "react-flow-renderer";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { Node } from "react-flow-renderer";
import { SymbolicTensor } from "@tensorflow/tfjs-layers";
import { IArgType, INNLib, TensorflowAdapter } from "../../../../../../adapters/INNLib";
import { Category, LibraryAdd } from "@mui/icons-material";
import { keys } from 'ts-transformer-keys';



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
  posY: number
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
      lib: new TensorflowAdapter(),
    },
  }; //as Node<DataBaseType>;
};
