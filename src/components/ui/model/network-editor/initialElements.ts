import { Elements } from "react-flow-renderer";
import { createNode } from "../nn-elements/layers/basic/LayerNode";
//import { createDropoutFromBase } from "../nn-elements/layers/basic/DropoutNode";

// setup elements, prob. move this to its own file
export const getInitialElements = () => {
  let ret: Elements = [];

  let newNode = createNode("input", "1", 160, 60, "tensorflow");
  if (newNode !== null) {
    ret.push(newNode);
  }

  newNode = createNode("dense", "2", 200, 200, "tensorflow");
  if (newNode !== null) {
    ret.push(newNode);
  }

  newNode = createNode("dense", "3", 200, 300, "tensorflow");
  if (newNode !== null) {
    ret.push(newNode);
  }

  newNode = createNode("dropout", "4", 200, 400, "tensorflow");
  if (newNode !== null) {
    ret.push(newNode);
  }

  newNode = createNode("output", "5", 200, 500, "tensorflow");
  if (newNode !== null) {
    ret.push(newNode);
  }

  ret.push({
    id: "e2-3",
    source: "2",
    target: "3",
    type: "nnedge",
    style: { strokeWidth: 2 },
  });
  return ret;
};
