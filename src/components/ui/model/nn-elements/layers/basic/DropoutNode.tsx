import { dropout } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { SymbolicTensor } from "@tensorflow/tfjs-layers";

import { DropoutLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/core";
import { DataBaseType } from "../../../../../../types";
import { Node } from "react-flow-renderer";
import { blue } from "@mui/material/colors";
import { NodeLayerArgs } from "../..";


interface DropoutArgs extends NodeLayerArgs{
    rate: number; 
    noiseShape: number[] | undefined; 
    seed: number | undefined;
}

const getDropoutLayerFunction = (args: DropoutArgs) => {
  return (input: SymbolicTensor | SymbolicTensor[] | undefined) => {
    if (input === undefined) return input;

    const rate = args.rate;
    const noiseShape = args.noiseShape;
    const seed = args.seed;

    return dropout({
      rate: rate,
      noiseShape: noiseShape,
      seed: seed,
    } as DropoutLayerArgs).apply(input) as SymbolicTensor;
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
      backgroundColor: blue[800],
      error: '',
      layerName: 'dropout',
    },
  }; //as Node<DataBaseType>;
};
