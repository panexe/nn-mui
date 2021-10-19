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
import {
  DataBaseType,
  layerOutput,
  OptionTypes,
} from "../../../../../../types";
import { green } from "@mui/material/colors";
import BaseNode from "./BaseNode";
import { useCallback, useEffect, useMemo, useState } from "react";
import NumberInput from "../../../layer-info/NumberInput";
import { data } from "@tensorflow/tfjs";
import ArgsMenu from "../../../layer-info/ArgsMenu";
import TextInput from "../../../layer-info/TextInput";
import React from "react";

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
  const [outputShape, setOutputShape] = useState("");
  const [focused, setFocused] = useState("name");

  useEffect(() => {
    if (props.data.outputValue === undefined) {
      setOutputShape("");
    }
  }, [props.data]);

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

    console.log("output layer dense: ", ret, ret.shape);
    setOutputShape(ret.shape.slice(1).join("x"));

    return { layerOutput: ret, modelInput: input.modelInput } as layerOutput;
  };

  const menuSkeleton = [
    { option: "options:", type: OptionTypes.category },
    { option: "name", type: OptionTypes.text },
    { option: "units", type: OptionTypes.number },
    { option: "activation", type: OptionTypes.activation },
    { option: "useBias", type: OptionTypes.boolean },
    { option: "advanced options", type: OptionTypes.category },
    { option: "kernelInitializer", type: OptionTypes.initializer },
    { option: "biasInitializer", type: OptionTypes.initializer },
    { option: "kernelConstraint", type: OptionTypes.constraint },
    { option: "biasConstraint", type: OptionTypes.constraint },
    { option: "kernelRegularizer", type: OptionTypes.regularizer },
    { option: "biasRegularizer", type: OptionTypes.regularizer },
  ];

  const [textTest, setTextTest] = useState<string | number>("test");
  const testRef = React.createRef<HTMLInputElement>();
  // may need some other performance optimization
  const menu = <ArgsMenu >

  </ArgsMenu>;
  useEffect(() => {
    props.data.changed = true;
  }, [args]);

  useEffect(() => {
    console.log("testref", testRef);
    testRef.current?.focus();
  }, [textTest]);

  return (
    <BaseNode
      {...props}
      menu={menu}
      layerFunction={layerFunction}
      layerTypeName="dense"
    >
      <p>
        {
          <TextInput
            //ref={testRef}
            name="test"
            value={textTest}
            setValue={setTextTest} ref={null}          />
        }
      </p>
    </BaseNode>
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

export default DenseNode;
