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
import { Divider, Stack, Typography } from "@mui/material";
import SelectInput from "../../../layer-info/SelectInput";

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
  const [nameArg, setNameArg] = useState<string>("");
  const [unitsArg, setUnitsArg] = useState<number>(32);
  const [activationArg, setActivationArg] = useState<ACTIVATIONS>(
    ACTIVATIONS.none
  );
  const [useBiasArg, setUseBiasArg] = useState<boolean>(true);
  const [kernelInitializerArg, setKernelInitializerArg] =
    useState<INITIALIZERS>(INITIALIZERS.none);
  const [biasInitializerArg, setBiasInitializerArg] = useState<INITIALIZERS>(
    INITIALIZERS.none
  );
  const [kernelConstraintArg, setKernelConstraintArg] = useState<CONSTRAINTS>(
    CONSTRAINTS.none
  );
  const [biasConstraintArg, setBiasConstraintArg] = useState<CONSTRAINTS>(
    CONSTRAINTS.none
  );
  const [kernelRegularizerArg, setKernelRegularizerArg] =
    useState<REGULARIZERS>(REGULARIZERS.none);
  const [biasRegularizerArg, setBiasRegularizerArg] = useState<REGULARIZERS>(
    REGULARIZERS.none
  );

  const [outputShape, setOutputShape] = useState("");
  const [focused, setFocused] = useState("name");
  const focusRef = React.createRef<HTMLInputElement>();

  useEffect(() => {
    if (props.data.outputValue === undefined) {
      setOutputShape("");
    }
  }, [props.data]);

  const layerFunction = (input: layerOutput | undefined) => {
    if (input === undefined) return input;

    const name = nameArg.length === 0 ? undefined : nameArg;
    const units = unitsArg;
    const useBias = useBiasArg;
    const activation = getActivation(activationArg);
    const kernelInitializer = getInitializer(kernelInitializerArg);
    const biasInitializer = getInitializer(biasInitializerArg);
    const kernelConstraint = getConstraint(kernelConstraintArg);
    const biasConstraint = getConstraint(biasConstraintArg);
    const kernelRegularizer = getRegularizer(kernelRegularizerArg);
    const biasRegularizer = getRegularizer(biasRegularizerArg);
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

  // may need some other performance optimization

  useEffect(() => {
    props.data.changed = true;
  }, [unitsArg]);

  // portals dont work well with focus
  // so we have to implement our own focus logic
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  });

  return (
    <BaseNode
      {...props}
      menu={
        <ArgsMenu>
          <Typography variant="h4" mt={2}>
            options
          </Typography>

          <TextInput<string>
            name="name"
            value={nameArg}
            setValue={setNameArg}
            ref={focused === "name" ? focusRef : null}
            onFocus={() => {
              setFocused("name");
              console.log("focus name");
            }}
          />
          <Divider />
          <TextInput<number>
            number
            name="units"
            value={unitsArg}
            setValue={setUnitsArg}
            ref={focused === "units" ? focusRef : null}
            onFocus={() => {
              setFocused("units");
              console.log("focus units");
            }}
          />
          <Divider />
          <SelectInput
            value={activationArg}
            setValue={(value: string) => {
              setActivationArg(ACTIVATIONS[value as keyof typeof ACTIVATIONS]);
            }}
            name="activation"
            options={Object.keys(ACTIVATIONS)}
            ref={focused === "activation" ? focusRef : null}
            onFocus={() => {
              setFocused("activation");
              console.log("focus activation");
            }}
          />
          <Divider />
        </ArgsMenu>
      }
      layerFunction={layerFunction}
      layerTypeName="dense"
    >
      {}
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
