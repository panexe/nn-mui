// REACT
import React from "react";

// REACT FLOW
import { Elements } from "react-flow-renderer";

// TFJS
import { SymbolicTensor } from "@tensorflow/tfjs";
import { input } from "@tensorflow/tfjs-layers";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { model } from "@tensorflow/tfjs-layers";
import { LayersModel } from "@tensorflow/tfjs-layers";
import '@tensorflow/tfjs-backend-cpu';

const elements: Elements = [];
const setElements: React.Dispatch<React.SetStateAction<Elements<any>>> =
  () => {};
const setInputTensor: React.Dispatch<React.SetStateAction<SymbolicTensor>> =
  () => {};
const inputLayer = input({ shape: [5] });
const outputLayer = dense({ units: 10, activation: "relu" }).apply(inputLayer);
const modelProp = model({
  inputs: inputLayer,
  outputs: outputLayer as SymbolicTensor,
});

type ModelContextType = {
  toolSelection: string;
  setToolSelection: React.Dispatch<React.SetStateAction<string>>;
  elements: Elements;
  setElements: React.Dispatch<React.SetStateAction<Elements<any>>>;
  inputTensor: SymbolicTensor;
  setInputTensor: React.Dispatch<React.SetStateAction<SymbolicTensor>>;
  model: LayersModel;
  setModel: React.Dispatch<React.SetStateAction<LayersModel>>;
  selectedNodeId: string;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string>>;
};

const setModel: React.Dispatch<React.SetStateAction<LayersModel>> = () => {};
const ModelContext = React.createContext<ModelContextType>({
  toolSelection: "select",
  setToolSelection: (tool: any) => {
    return tool;
  },
  elements: elements,
  setElements: setElements,
  inputTensor: inputLayer,
  setInputTensor: setInputTensor,
  model: modelProp,
  setModel: setModel,
  selectedNodeId: "1",
  setSelectedNodeId: () => {},
});

export default ModelContext;
