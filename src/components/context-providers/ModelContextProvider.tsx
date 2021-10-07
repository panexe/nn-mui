import ModelContext from "../../context/model-context";
import { useState } from "react";
import { Elements, Node as FlowNode } from "react-flow-renderer";
import { input, LayersModel, model, SymbolicTensor } from "@tensorflow/tfjs-layers";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";

const initialElements = [
  {
    id: "1",
    type: "inputNode", // input node
    position: { x: 250, y: 25 },
    data: {
      inputValue: null,
      outputValue: null,
      value: 10,
      args: {},
      setArgs: () => {},
      menu: Object(),
    },
  },
  // default node
  {
    id: "2",
    type: "denseNode",

    position: { x: 100, y: 125 },
    data: {
      inputValue: null,
      outputValue: null,
      value: 0,
      args: {},
      setArgs: () => {},
      menu: Object(),
    },
  },
  {
    id: "3",
    type: "denseNode",
    position: { x: 100, y: 225 },
    data: {
      inputValue: null,
      outputValue: null,
      value: 0,
      args: {},
      setArgs: () => {},
      menu: Object(),
    },
  },
  {
    id: "4",
    type: "outputNode", // output node
    position: { x: 250, y: 250 },
    data: {
      label: "outputNode",
      inputValue: null,
      outputValue: null,
      value: 10,
      args: {},
      setArgs: () => {},
      menu: Object(),
    },
  },
  // animated edge
];

const inputLayer = input({ shape: [32] });
const outputLayer = dense({units:32}).apply(inputLayer);
const initModel = model({inputs: inputLayer, outputs:inputLayer as SymbolicTensor})


const ModelContextProvider: React.FC = (props) => {
  const [elements, setElements] = useState<Elements>(initialElements);
  const [toolSelection, setToolSelection] = useState("select");
  const [inputTensor, setInputTensor] = useState<SymbolicTensor>(
    input({ shape: [32] })
  );
  const [model, setModel] = useState<LayersModel>(initModel);
  const [selectedNode, setSelectedNode] = useState<FlowNode<any>>(elements[0]);
  const [selectedNodeId, setSelectedNodeId] = useState('1');

  return (
    <ModelContext.Provider
      value={{
        toolSelection: toolSelection,
        setToolSelection: setToolSelection,
        elements: elements,
        setElements: setElements,
        inputTensor: inputTensor,
        setInputTensor: setInputTensor,
        model: model,
        setModel: setModel,
        selectedNode: selectedNode,
        setSelectedNode: setSelectedNode,
        selectedNodeId: selectedNodeId, 
        setSelectedNodeId: setSelectedNodeId,
      }}
    >
      {props.children}
    </ModelContext.Provider>
  );
};

export default ModelContextProvider;
