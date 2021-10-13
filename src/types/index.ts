import { SymbolicTensor } from "@tensorflow/tfjs-layers";

export interface DataBaseType<T=any> {
  inputValue: SymbolicTensor | undefined; // should also include SymbolicTensor[]
  outputValue: SymbolicTensor | undefined;
  args: T;
  menu: any;
  changed: boolean;
  getLayerFunction: (
    args: T
  ) => (
    input: layerOutput | undefined
  ) => layerOutput | undefined;
  backgroundColor?: string;
  error: string;
  layerName: string;
}

export type layerOutput = { layerOutput: SymbolicTensor, modelInput: SymbolicTensor | SymbolicTensor [] };

export enum Portals{
    layerInfo='layer-info-portal'
}