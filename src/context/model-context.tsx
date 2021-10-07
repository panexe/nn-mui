import { SymbolicTensor } from "@tensorflow/tfjs";
import React from "react";
import { Elements } from "react-flow-renderer";
import * as tf from "@tensorflow/tfjs";
import { LayersModel } from "@tensorflow/tfjs-layers";
import { Node as FlowNode} from "react-flow-renderer";
import InputNode from "../components/ui/model/nn-elements/layers/inputs/InputNode";

const elements: Elements = [];
const setElements: React.Dispatch<React.SetStateAction<Elements<any>>> =
  () => {};
const setInputTensor: React.Dispatch<React.SetStateAction<SymbolicTensor>> =
  () => {};
const inputLayer = tf.input({ shape: [5] });
const outputLayer = tf.layers
  .dense({ units: 10, activation: "relu" })
  .apply(inputLayer);
const modelProp = tf.model({
  inputs: inputLayer,
  outputs: outputLayer as SymbolicTensor,
});



type ModelContextType = {
    toolSelection: string,
    setToolSelection: React.Dispatch<React.SetStateAction<string>>,
    elements: Elements,
    setElements: React.Dispatch<React.SetStateAction<Elements<any>>>,
    inputTensor: SymbolicTensor,
    setInputTensor: React.Dispatch<React.SetStateAction<SymbolicTensor>>,
    model: LayersModel,
    setModel: React.Dispatch<React.SetStateAction<LayersModel>>, 
    selectedNode: (FlowNode<any>),
    setSelectedNode: (React.Dispatch<React.SetStateAction<FlowNode<any>>> ), 
    selectedNodeId: string, 
    setSelectedNodeId: React.Dispatch<React.SetStateAction<string>>,
};

const setModel: React.Dispatch<React.SetStateAction<LayersModel>> = () => {};
const ModelContext = React.createContext<ModelContextType>({
  toolSelection: "select",
  setToolSelection: (tool: any) => {return tool},
  elements: elements,
  setElements: setElements,
  inputTensor: inputLayer,
  setInputTensor: setInputTensor,
  model: (modelProp),
  setModel: setModel,
  selectedNode: {id:'1'}, 
  setSelectedNode: () => {},
  selectedNodeId: '1',
  setSelectedNodeId: () => {},
});

export default ModelContext;
