// TFJS
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { DenseLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/core";
import { SymbolicTensor } from "@tensorflow/tfjs-layers";

// NNUI
import {
  ACTIVATIONS,
  getActivation,
  INITIALIZERS,
  getInitializer,
  CONSTRAINTS,
  getConstraint,
  REGULARIZERS,
  getRegularizer,
  NodeLayerArgs,
} from "../..";
import { Node } from "react-flow-renderer";
import { DataBaseType } from "../../../../../../types";

interface DenseArgs extends NodeLayerArgs {
  units: number;
  activation: ACTIVATIONS;
  useBias: boolean;
  kernelInitializer: INITIALIZERS;
  biasInitializer: INITIALIZERS;
  kernelConstraint: CONSTRAINTS;
  biasConstraint: CONSTRAINTS;
  kernelRegularizer: REGULARIZERS;
  biasRegularizer: REGULARIZERS;
};

const getDenseLayerFunction = (args: DenseArgs) => {
  return (input: SymbolicTensor | SymbolicTensor[] | undefined) => {
    if (input === undefined) return input;

    const name = args.name;
    const units = args.units;
    const useBias = args.useBias;
    const activation = getActivation(args.activation);
    const kernelInitializer = getInitializer(args.kernelInitializer);
    const biasInitializer = getInitializer(args.biasInitializer);
    const kernelConstraint = getConstraint(args.kernelConstraint);
    const biasConstraint = getConstraint(args.biasConstraint);
    const kernelRegularizer = getRegularizer(args.kernelRegularizer);
    const biasRegularizer = getRegularizer(args.biasRegularizer);
    return dense({
      name: name,
      units: units,
      activation: activation,
      useBias: useBias,
      kernelInitializer: kernelInitializer,
      biasInitializer: biasInitializer,
      kernelConstraint: kernelConstraint,
      biasConstraint: biasConstraint,
      kernelRegularizer: kernelRegularizer,
      biasRegularizer: biasRegularizer,
    } as DenseLayerArgs).apply(input) as SymbolicTensor;
  };
};

export const createDenseFromBase = (
  id: string,
  posX: number,
  posY: number
): Node<DataBaseType<DenseArgs>> => {
  return {
    id: id,
    type: "baseNode",
    position: { x: posX, y: posY },
    data: {
      inputValue: undefined,
      outputValue: undefined,
      args: {
        units: 32,
        // set standard values
        activation: ACTIVATIONS.none,
        useBias: true,
        kernelInitializer: INITIALIZERS.none,
        biasInitializer: INITIALIZERS.none,
        kernelConstraint: CONSTRAINTS.none,
        biasConstraint: CONSTRAINTS.none,
        kernelRegularizer: REGULARIZERS.none,
        biasRegularizer: REGULARIZERS.none,
      },
      menu: {
        Options: {
          name: "string",
          units: "number",
          activation: "activation",
          useBias: "boolean",
        },
        "Advanced Options": {
          kernelInitializer: "initializer",
          biasInitializer: "initializer",
          kernelConstraint: "constraint",
          biasConstraint: "constraint",
          kernelRegularizer: "regularizer",
          biasRegularizer: "regularizer",
        },
      },
      changed: true,
      getLayerFunction: getDenseLayerFunction,
    },
  }; //as Node<DataBaseType>;
};
