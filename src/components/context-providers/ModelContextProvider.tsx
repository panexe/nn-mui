// REACT
import { useState } from "react";

// REACT FLOW
import { Elements } from "react-flow-renderer";

// TFJS
import { input } from "@tensorflow/tfjs-layers";
import { LayersModel } from "@tensorflow/tfjs-layers";
import { model } from "@tensorflow/tfjs-layers";
import { SymbolicTensor } from "@tensorflow/tfjs-layers";

// NNUI
import ModelContext from "../../context/model-context";
import { createDenseFromBase } from "../ui/model/nn-elements/layers/basic/DenseFromBase";
import { createDropoutFromBase } from "../ui/model/nn-elements/layers/basic/DropoutNode";


// setup elements, prob. move this to its own file
const initialElements = [
  {
    id: "input",
    type: "inputNode", // input node
    position: { x: 250, y: 25 },
    data: {
      inputValue: null,
      outputValue: null,
      value: 10,
      args: {},
      setArgs: () => {},
      menu: Object(),
      changed: true,
    },
  },
  // default node
  createDenseFromBase('2', 355, 150),
  createDenseFromBase('3', 355, 150),
  createDropoutFromBase('4', 360, 150),

  {
    id: "output",
    type: "outputNode", // output node
    position: { x: 250, y: 250 },
    data: {
      label: "outputNode",
      inputValue: null,
      outputValue: null,
      args: {},
      setArgs: () => {},
      menu: Object(),
      changed: true,
    },
  },
  // animated edge
];

const inputLayer = input({ shape: [32] });
const initModel = model({
  inputs: inputLayer,
  outputs: inputLayer as SymbolicTensor,
});

const ModelContextProvider: React.FC = (props) => {
  const [elements, setElements] = useState<Elements>(initialElements);
  const [toolSelection, setToolSelection] = useState("select");
  const [inputTensor, setInputTensor] = useState<SymbolicTensor>(
    input({ shape: [32] })
  );
  const [model, setModel] = useState<LayersModel>(initModel);
  const [selectedNodeId, setSelectedNodeId] = useState("1");

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
        selectedNodeId: selectedNodeId,
        setSelectedNodeId: setSelectedNodeId,
      }}
    >
      {props.children}
    </ModelContext.Provider>
  );
};

export default ModelContextProvider;
