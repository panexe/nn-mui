import { SymbolicTensor } from "@tensorflow/tfjs-layers";
import { ILayerOutput, ILayerPlaceholder, INNLib } from "../adapters/INNLib";

export interface DataBaseType {
  inputValue: ILayerOutput<any> | undefined; // should also include SymbolicTensor[]
  outputValue: ILayerOutput<any> | undefined;
  changed: boolean;
  error: string;
  layerName?: string;
  libName: string;
  fromLoad?: boolean;
  layerArgs?: any;
}

export type layerOutput = { layerOutput: SymbolicTensor, modelInput: SymbolicTensor | SymbolicTensor [] };

export enum Portals{
    layerInfo='layer-info-portal'
}

export enum OptionTypes{
  category,
  text, 
  number, 
  boolean, 
  activation, 
  constraint, 
  regularizer, 
  initializer,
}