import { TensorflowAdapter } from "../../../../adapters/INNLib";
import { createDense } from "../nn-elements/layers/basic/DenseNode";
import { createDropout } from "../nn-elements/layers/basic/DropoutNode";
import { createInput } from "../nn-elements/layers/inputs/InputNode";
import { createOutput } from "../nn-elements/layers/outputs/OutputNode";
//import { createDropoutFromBase } from "../nn-elements/layers/basic/DropoutNode";

// setup elements, prob. move this to its own file
export const initialElements = [

  createInput('1', 240, 20),
  // default node
  createDense("2", 360, 160, new TensorflowAdapter()),
  createDense("3", 460, 160, new TensorflowAdapter()),
  createDropout("4", 360, 160, new TensorflowAdapter()),
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    style: { strokeWidth: 2 },
  },
  createOutput('5', 560, 160),
];
