import { ArrowHeadType } from "react-flow-renderer";
import { createDense } from "../nn-elements/layers/basic/DenseNode";
import { createDropout } from "../nn-elements/layers/basic/DropoutNode";
//import { createDropoutFromBase } from "../nn-elements/layers/basic/DropoutNode";

// setup elements, prob. move this to its own file
export const initialElements = [
    {
      id: "input",
      type: "inputNode", // input node
      position: { x: 240, y: 20 },
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
    createDense('2', 360, 160),
    createDense('3', 460, 160),
    createDropout('4', 360, 160),
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      type: 'smoothstep',
      style: {strokeWidth: 2},
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