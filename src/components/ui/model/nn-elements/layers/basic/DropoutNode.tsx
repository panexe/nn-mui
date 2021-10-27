import { BaseNodeProps } from "./BaseNode";
import MenuBaseNode from "./MenuBaseNode";
import { Dropout, DropoutLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/core";
import {
  DataBaseType,
  layerOutput,
  OptionTypes,
} from "../../../../../../types";
import { NodeProps } from "react-flow-renderer";
import { dropout } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { Node } from "react-flow-renderer";
import { SymbolicTensor } from "@tensorflow/tfjs-layers";
import { IArgType, INNLib, TensorflowAdapter } from "../../../../../../adapters/INNLib";


const DropoutNode = (props: NodeProps<DataBaseType>) => {

  return (
    <MenuBaseNode
      {...props}
      nnLib={props.data.lib}
      layer={props.data.lib.dropout}
      layerTypeName="dropout"
    />
  );
};
export default DropoutNode;


export const createDropout = (
    id: string,
    posX: number,
    posY: number
  ): Node<DataBaseType> => {
    return {
      id: id,
      type: "dropoutNode",
      position: { x: posX, y: posY },
      dragHandle: ".drag-handle",
      data: {
        inputValue: undefined,
        outputValue: undefined,
        changed: true,
        error: "",
        layerName: "dropout",
        lib: new TensorflowAdapter(),
      },
    }; //as Node<DataBaseType>;
  };





/*
const getDropoutLayerFunction = (args: DropoutArgs) => {
  return (input: layerOutput | undefined) => {
    if (input === undefined) return input;

    const rate = args.rate;
    const noiseShape = args.noiseShape;
    const seed = args.seed;

    const ret = dropout({
      rate: rate,
      noiseShape: noiseShape,
      seed: seed,
    } as DropoutLayerArgs).apply(input.layerOutput) as SymbolicTensor;
    return {layerOutput: ret, modelInput: input.modelInput};
  };
};

export const createDropoutFromBase = (
  id: string,
  posX: number,
  posY: number
): Node<DataBaseType<DropoutArgs>> => {
  return {
    id: id,
    type: "baseNode",
    position: { x: posX, y: posY },
    data: {
      inputValue: undefined,
      outputValue: undefined,
      args: {
        rate: 0.75,
        noiseShape: undefined,
        seed: undefined,
      },
      menu: {
        Options: {
          name: "string",
          rate: "number",
        },
      },
      changed: true,
      getLayerFunction: getDropoutLayerFunction,
      backgroundColor: blue[400],
      error: '',
      layerName: 'dropout',
    },
  }; //as Node<DataBaseType>;
};
*/