import { Node } from "react-flow-renderer";
import * as constants from "../../../../constants/constants";

/**
 * Creates a matrix with occupied spots from the given nodes.
 * Currently all nodes must have the same size.
 *
 * @param nodes nodes
 * @param leaveOut id of a node, that gets ignored when creating the matrix
 * @param ignoreIntersection if true (m element of {0,1}), if false (m element of N+)
 * @returns
 */
export const nodesToGrid = (
  nodes: Node[],
  nodeWidth: number,
  nodeHeight: number,
  scaleFactor: number,
  leaveOut?: string,
  ignoreIntersection: boolean = false
) => {
  // we scale the normal coords by the snap-to-grid size, because the nodes
  // will be placed there anyway -> less memory & computations

  // the grid starts at the upper-left corner of the left-most and highest node
  // and ends at the lower-right corner of the right-most and lowest node
  let xMax = Number.MIN_SAFE_INTEGER,
    yMax = Number.MIN_SAFE_INTEGER,
    xMin = Number.MAX_SAFE_INTEGER,
    yMin = Number.MAX_SAFE_INTEGER;

  // find bounds
  nodes.map((node) => {
    xMax =
      xMax < node.position.x + nodeWidth ? node.position.x + nodeWidth : xMax;
    yMax =
      yMax < node.position.y + nodeHeight ? node.position.y + nodeHeight : yMax;
    xMin = xMin > node.position.x ? node.position.x : xMin;
    yMin = yMin > node.position.y ? node.position.y : yMin;
  });
  console.log("smallest coords", xMin, yMin);
  console.log("biggest coord", xMax, yMax);

  // the amount the whole grid needs to be translated to start at the origin
  const offsetX = Math.round(xMin / scaleFactor);
  const offsetY = Math.round(yMin / scaleFactor);
  console.log("offsets(x,y):", offsetX, offsetY);

  // total size of the grid
  const xSize = Math.round(xMax / scaleFactor - offsetX);
  const ySize = Math.round(yMax / scaleFactor - offsetY);
  console.log("grid size(x,y)", xSize, ySize);

  // creating a 2d array (there might be more performant ways to init. TODO: optimize)
  var grid: number[][] = Array.from(Array(ySize), () =>
    new Array(xSize).fill(0)
  );
  console.log("array:", grid);

  // place nodes on grid

  // size of node
  // TODO: maybe generalize for other node sizes

  nodes.map((node) => {
    if (leaveOut !== undefined && node.id === leaveOut) {
      return;
    }
    placeNodeOnGrid(
      node,
      grid,
      { x: offsetX, y: offsetY },
      nodeWidth,
      nodeHeight,
      scaleFactor,
      ignoreIntersection
    );
  });
  return { grid: grid, offset: { x: offsetX, y: offsetY } };
};

/**
 *
 * @param node Node to be placed
 * @param grid ref to grid the node should be placed on
 * @param offset offset from the origin
 * @param nodeWidth x-size of node
 * @param nodeHeight y-size of node
 * @param scaleFactor down-scaling factor
 */
export const placeNodeOnGrid = (
  node: Node,
  grid: number[][],
  offset: { x: number; y: number },
  nodeWidth: number,
  nodeHeight: number,
  scaleFactor: number,
  ignoreIntersection: boolean = true,
  nodeOffset: { x: number; y: number } = { x: 0, y: 0 }
) => {
  const rangeX = Math.round(nodeWidth / scaleFactor);
  const rangeY = Math.round(nodeHeight / scaleFactor);
  const posX = node.position.x / scaleFactor - offset.x + nodeOffset.x;
  const posY = node.position.y / scaleFactor - offset.y + nodeOffset.y;

  for (var x = 0; x < rangeX; x++) {
    for (var y = 0; y < rangeY; y++) {
      if (ignoreIntersection) {
        grid[y + posY][x + posX] = 1;
      } else {
        grid[y + posY][x + posX] += 1;
      }
    }
  }
  return grid;
};

export const checkIntersection = (
  node: Node,
  grid: number[][],
  offset: { x: number; y: number },
  nodeWidth: number,
  nodeHeight: number,
  scaleFactor: number,
  nodeOffset: { x: number; y: number } = { x: 0, y: 0 }
) => {
  // place on copy to not effect the original grid
  let gridCopy = grid.map((arr) => arr.slice());
  gridCopy = placeNodeOnGrid(
    node,
    gridCopy,
    offset,
    nodeWidth,
    nodeHeight,
    scaleFactor,
    false,
    nodeOffset
  );

  // check intersection
  for (var i = 0; i < gridCopy.length; i++) {
    if (gridCopy[i].some((el) => el > 1)) {
      return true;
    }
  }
  return false;
};


export const findNextFreeSpot = (
  node: Node,
  grid: number[][],
  offset: { x: number; y: number },
  nodeWidth: number,
  nodeHeight: number,
  scaleFactor: number
) => {
  // get position of node in grid
  const startPos = {
    x: Math.round(node.position.x / scaleFactor) - offset.x,
    y: Math.round(node.position.y / scaleFactor) - offset.y,
  };
  const nodeSize = {
      x: Math.round(nodeWidth / scaleFactor), 
      y: Math.round(nodeHeight / scaleFactor),
  }

  // extract grid dims from the array
  const gridSize = { x: grid[0].length, y: grid.length };
  console.log("grid dim", gridSize);

  const rangeRight =
    gridSize.x - startPos.x + Math.round(nodeWidth / scaleFactor) ;
  const rangeLeft = startPos.x === 0 ? nodeSize.x +1 : startPos.x;
  const rangeMax = Math.max(rangeLeft, rangeRight);
  console.log("range right | range left", rangeRight, rangeLeft);

  //console.log(grid[0].length - rangeX - posX);
  // find next free spot
  for (var i = 1; i <= rangeMax; i++) {
    console.log(i);

    // right
    if (i <= rangeRight) {
      let gridCopy = grid.map((arr) => arr.slice());
      const intersects = checkIntersection(
        node,
        gridCopy,
        offset,
        nodeWidth,
        nodeHeight,
        scaleFactor,
        { x: i, y: 0 }
      );
      if (intersects === false) {
        return i;
      }
    }

    // left
    if (i <= rangeLeft) {
      let gridCopy = grid.map((arr) => arr.slice());
      const intersects = checkIntersection(
        node,
        gridCopy,
        offset,
        nodeWidth,
        nodeHeight,
        scaleFactor,
        { x: -i, y: 0 }
      );
      if (intersects === false) {
        return -i;
      }
    }
  }
  return 0;
};
