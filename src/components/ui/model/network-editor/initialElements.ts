import { ArrowHeadType } from "react-flow-renderer";
import { createDenseFromBase } from "../nn-elements/layers/basic/DenseFromBase";
//import { createDropoutFromBase } from "../nn-elements/layers/basic/DropoutNode";

// setup elements, prob. move this to its own file
export const initialElements = [
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
    createDenseFromBase('2', 360, 160),
    createDenseFromBase('3', 460, 160),
    //createDropoutFromBase('4', 360, 160),
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      type: 'nnedge',
      data: { text: 'custom edge' },
      arrowHeadType: ArrowHeadType.Arrow,
    },
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