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
import { IArgType } from "../../../../../../adapters/INNLib";
import { Category } from "@mui/icons-material";
import { keys } from 'ts-transformer-keys';

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

  type Complete<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
      ? T[P]
      : T[P] | undefined;
  };
  type f =  Complete<DenseLayerArgs>;

  type K1 = keyof Complete<DenseLayerArgs>;
  
  //const argTest: Complete<DenseLayerArgs> = { units: 1 };
  console.log("argTest:");
  console.log(K1);

  const CategoryArg: IArgType = {
    type: "category",
  };

  const NumberArg: IArgType = {
    type: "number",
  };

  const menu = {
    elements: [
      { name: "options", type: CategoryArg },
      { name: "units", type: NumberArg },
    ],
  };

  /*const menu = {
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
  }; */

  return (
    <MenuBaseNode<Dense, DenseLayerArgs, SymbolicTensor>
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
