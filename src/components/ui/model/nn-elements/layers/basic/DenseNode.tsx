import { BaseNodeProps } from "./BaseNode";
import MenuBaseNode from "./MenuBaseNode";
import { DenseLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/core";
import {
  DataBaseType,
  layerOutput,
  OptionTypes,
} from "../../../../../../types";
import { NodeProps } from "react-flow-renderer";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { Node } from "react-flow-renderer";


const DenseNode = (props: NodeProps<DataBaseType>) => {
  const initialArgs: DenseLayerArgs = {
    units: 32,
    name: undefined,
    activation: undefined,
    useBias: true,
    kernelInitializer: undefined,
    biasInitializer: undefined,
    kernelConstraint: undefined,
    biasConstraint: undefined,
    kernelRegularizer: undefined,
    biasRegularizer: undefined,
    trainable: true,
  };

  const menu = {
    options: OptionTypes.category,
    units: OptionTypes.number,
    name: OptionTypes.text,
    activation: OptionTypes.activation,
    useBias: OptionTypes.boolean,
    "advanced options": OptionTypes.category,
    kernelInitializer: OptionTypes.initializer,
    biasInitializer: OptionTypes.initializer,
    kernelConstraint: OptionTypes.constraint,
    biasConstraint: OptionTypes.constraint,
    kernelRegularizer: OptionTypes.regularizer,
    biasRegularizer: OptionTypes.regularizer,
    trainable: OptionTypes.boolean,
  };

  return (
    <MenuBaseNode<DenseLayerArgs>
      {...props}
      initialArgs={initialArgs}
      menu={menu}
      tfjsLayer={dense}
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
      },
    }; //as Node<DataBaseType>;
  };


