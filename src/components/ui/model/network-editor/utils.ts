import { Node } from "react-flow-renderer";
import * as constants from "../../../../constants/constants";

export const getPlacementOffset = (
  nodes: Node[],
  element: Node,
  padding: number = 40
) => {
  // filter this node
  const otherNodes = nodes.filter((node) => node.id !== element.id);
  let ret = element.position.x;

  // get all nodes that could intersect verticly
  const candidates = otherNodes.filter(
    (node) =>
      (element.position.y + constants.NODE_HEIGHT > node.position.y &&
        element.position.y < node.position.y) ||
      element.position.y === node.position.y ||
      (element.position.y < node.position.y + constants.NODE_HEIGHT &&
        element.position.y > node.position.y)
  );
  console.log("nodes off", candidates);

  let additionalOffset = 0;
  let colided = false;
  do {
    colided = false;
    // get all nodes that could intersect horizontaly from the last filter results
    const results = candidates.filter(
      (node) =>
        (ret + constants.NODE_WIDTH > node.position.x &&
          ret < node.position.x) ||
        ret === node.position.x ||
        (ret < node.position.x + constants.NODE_WIDTH && ret > node.position.x)
    );

    if (results.length > 0) {
      console.log("collision!");
      colided = true;
      const rightMost = results
        .map((val) => val.position.x)
        .reduce((prev, cur) => Math.max(prev, cur), Number.MIN_SAFE_INTEGER);
      ret = rightMost + constants.NODE_WIDTH + padding;
      console.log("results", results, "newX", ret);
    }
  } while (colided === true);
  return ret;
};
