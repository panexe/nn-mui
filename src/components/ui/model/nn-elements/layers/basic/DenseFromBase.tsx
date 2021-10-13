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
import { Node, NodeProps } from "react-flow-renderer";
import { DataBaseType, layerOutput } from "../../../../../../types";
import { green } from "@mui/material/colors";
import BaseNode from "./BaseNode";
import { useEffect, useState } from "react";
import NumberInput from "../../../layer-info/NumberInput";

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
}

const DenseNode = (props: NodeProps<DataBaseType>) => {
  const [args, setArgs] = useState<DenseArgs>({
    units: -32,
    // set standard values
    activation: ACTIVATIONS.none,
    useBias: true,
    kernelInitializer: INITIALIZERS.none,
    biasInitializer: INITIALIZERS.none,
    kernelConstraint: CONSTRAINTS.none,
    biasConstraint: CONSTRAINTS.none,
    kernelRegularizer: REGULARIZERS.none,
    biasRegularizer: REGULARIZERS.none,
  });

  const layerFunction = (input: layerOutput | undefined) => {
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
    const ret = dense({
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
    } as DenseLayerArgs).apply(input.layerOutput) as SymbolicTensor;
    return { layerOutput: ret, modelInput: input.modelInput } as layerOutput;
  };

  const menu = (
    <NumberInput
      id="unitsinput"
      name="units"
      value={args.units}
      setValue={(val) => {
        setArgs((old) => {
          return { ...old, units: val as number };
        });
      }}
    />
  );
  useEffect(() => {
    console.log("args", args);
  }, [args]);

  return (
    <BaseNode
      {...props}
      menu={menu}
      layerFunction={layerFunction}
      layerTypeName="dense"
      args={args}
    ></BaseNode>
  );
};

export const createDenseFromBase = (
  id: string,
  posX: number,
  posY: number
): Node<DataBaseType> => {
  return {
    id: id,
    type: "denseNode",
    position: { x: posX, y: posY },
    data: {
      inputValue: undefined,
      outputValue: undefined,
      changed: true,
      error: "",
      layerName: "dense",
    },
  }; //as Node<DataBaseType>;
};

export default DenseNode;
