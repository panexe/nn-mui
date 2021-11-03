import { SymbolicTensor } from "@tensorflow/tfjs-layers";
import { ILayerPlaceholder, INNLib } from "../adapters/INNLib";

export interface DataBaseType {
  inputValue: ILayerPlaceholder | undefined; // should also include SymbolicTensor[]
  outputValue: ILayerPlaceholder | undefined;
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