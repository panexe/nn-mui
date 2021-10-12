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
    input: SymbolicTensor | SymbolicTensor[] | undefined
  ) => SymbolicTensor | undefined;
  backgroundColor?: string;
  error: string;
  layerName: string;
}
