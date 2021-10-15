import { SymbolicTensor } from "@tensorflow/tfjs-layers";

export interface DataBaseType {
  inputValue: SymbolicTensor | undefined; // should also include SymbolicTensor[]
  outputValue: SymbolicTensor | undefined;
  changed: boolean;
  error: string;
  layerName?: string;
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