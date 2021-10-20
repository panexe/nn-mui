// TFJS
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { DenseLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/core";
import { constraints, SymbolicTensor } from "@tensorflow/tfjs-layers";

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
import { Node, useStoreActions } from "react-flow-renderer";
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
import { NodeProps } from "react-flow-renderer/dist/types";
import CheckBoxInput from "../../../layer-info/CheckBoxInput";

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
  const [outputShape, setOutputShape] = useState("");
  const [focused, setFocused] = useState("name");
  const focusRef = React.createRef<HTMLInputElement>();

  const [openSelet, setOpenSelect] = useState("");

  const [denseLayerArgs, setDenseLayerArgs] = useState<DenseLayerArgs>({
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
  });

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

  const setElements = useStoreActions((store) => store.setElements);

  const onOpen = (select: string) => {
    setOpenSelect(select);
  };
  const onClose = () => {
    setOpenSelect("");
  };

  useEffect(() => {
    if (props.data.outputValue === undefined) {
      setOutputShape("");
    }
  }, [props.data]);

  const layerFunction = (input: layerOutput | undefined) => {
    if (input === undefined) return input;

    const ret = dense(denseLayerArgs).apply(
      input.layerOutput
    ) as SymbolicTensor;

    console.log("output layer dense: ", ret, ret.shape);
    setOutputShape(ret.shape.slice(1).join("x"));

    return { layerOutput: ret, modelInput: input.modelInput } as layerOutput;
  };

  // may need some other performance optimization

  useEffect(() => {
    props.data.changed = true;
    //setElements(elements);
    // set all elements new
    console.log("changed data");
    console.log("denselayerargs", denseLayerArgs);
    console.log(Object.keys(denseLayerArgs));
  }, [denseLayerArgs]);

  // portals dont work well with focus
  // so we have to implement our own focus logic
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  });

  const createCategory = (name: string, key: string) => {
    return (
      <Typography variant="h4" mt={2} key={key}>
        {name}
      </Typography>
    );
  };

  const createText = (name: string, key: string) => {
    return (
      <React.Fragment key={`fragmet-${key}`}>
      <TextInput<string>
        key={key}
        name={name}
        value={
          (denseLayerArgs as any)[name] ? (denseLayerArgs as any)[name] : ""
        }
        setValue={(value: string) => {
          setDenseLayerArgs((old) => {
            return { ...old, [name]: value };
          });
        }}
        ref={focused === name ? focusRef : null}
        onFocus={() => {
          setFocused(name);
          console.log(`focus ${name}`);
        }}
      />
      <Divider key={`divider-${key}`} />
      </React.Fragment>
    );
  };

  const createNumber = (name: string, key: string) => {
    return (
      <React.Fragment key={`fragmet-${key}`}>
      <TextInput<number>
        key={key}
        number
        name={name}
        value={(denseLayerArgs as any)[name]}
        setValue={(value: number) => {
          setDenseLayerArgs((old) => {
            return { ...old, [name]: value };
          });
        }}
        ref={focused === name ? focusRef : null}
        onFocus={() => {
          setFocused(name);
          console.log(`focus ${name}`);
        }}
      />
      <Divider key={`divider-${key}`} />
      </React.Fragment>
    );
  };

  const createSelect = (name: string, options: string[], key: string) => {
    return (
      <React.Fragment key={`fragmet-${key}`}>
      <SelectInput
        key={key}
        name={name}
        value={
          (denseLayerArgs as any)[name] ? (denseLayerArgs as any)[name] : "none"
        }
        setValue={(value: string) => {
          setDenseLayerArgs((old) => {
            return { ...old, [name]: value === "none" ? undefined : value };
          });
        }}
        options={options}
        ref={focused === name ? focusRef : null}
        onFocus={() => {
          setFocused(name);
          console.log(`focus ${name}`);
        }}
        onBlur={() => {
          setFocused("");
          console.log(`loose focus`);
        }}
        open={openSelet === name}
        onOpen={() => {
          onOpen(name);
        }}
        onClose={onClose}
      />
      <Divider key={`divider-${key}`} />
      </React.Fragment>
    );
  };

  const createCheckbox = (name: string, key: string) => {
    return (
      <React.Fragment key={`fragmet-${key}`}>
      <CheckBoxInput
        key={key}
        name={name}
        value={
          (denseLayerArgs as any)[name] ? (denseLayerArgs as any)[name] : false
        }
        setValue={(value: boolean) => {
          setDenseLayerArgs((old) => {
            return { ...old, [name]: value };
          });
        }}
        ref={focused === name ? focusRef : null}
        onFocus={() => {
          setFocused(name);
          console.log(`focus ${name}`);
        }}
      />
      <Divider key={`divider-${key}`} />
      </React.Fragment>
    );
  };

  return (
    <BaseNode
      {...props}
      menu={
        <ArgsMenu>
          {Object.entries(menu).map(([key, val]) => {
            switch (val) {
              case OptionTypes.category:
                return createCategory(key, `${key}-${props.id}`);
              case OptionTypes.text:
                return createText(key, `${key}-${props.id}`);
              case OptionTypes.number:
                return createNumber(key, `${key}-${props.id}`);
              case OptionTypes.boolean:
                return createCheckbox(key, `${key}-${props.id}`);
              case OptionTypes.activation:
                return createSelect(
                  key,
                  Object.keys(ACTIVATIONS),
                  `${key}-${props.id}`
                );
              case OptionTypes.constraint:
                return createSelect(
                  key,
                  Object.keys(CONSTRAINTS),
                  `${key}-${props.id}`
                );
              case OptionTypes.initializer:
                return createSelect(
                  key,
                  Object.keys(INITIALIZERS),
                  `${key}-${props.id}`
                );
              case OptionTypes.regularizer:
                return createSelect(
                  key,
                  Object.keys(REGULARIZERS),
                  `${key}-${props.id}`
                );
            }
          })}
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
