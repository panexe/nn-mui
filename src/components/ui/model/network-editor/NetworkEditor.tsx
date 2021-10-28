// REACT
import React, { MouseEvent, ReactNode, useRef, useState } from "react";
import { DragEvent } from "react";

// REACT FLOW
import ReactFlow, {
  BackgroundVariant,
  FlowElement,
  isEdge,
  isNode,
  removeElements,
  useStoreState,
} from "react-flow-renderer";
import { addEdge } from "react-flow-renderer";
import { Background } from "react-flow-renderer";
import { Connection } from "react-flow-renderer";
import { Edge } from "react-flow-renderer";
import { Elements } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { SnapGrid } from "react-flow-renderer";
import { OnLoadParams } from "react-flow-renderer";
import { ElementId } from "react-flow-renderer";
import { useStoreActions } from "react-flow-renderer";

// NNUI
import ContextMenu from "../../context-menu/ContextMenu";
import ToolSelectBar from "./ToolSelectBar";
import { nodeTypes } from "../nn-elements/layers";

// MUI
import { Box } from "@mui/material";

// Tensorflow
//
import "@tensorflow/tfjs-backend-cpu";

//import { createDropoutFromBase } from "../nn-elements/layers/basic/DropoutNode";
import { edgeTypes } from "../edges";
import * as constants from "../../../../constants/constants";
import { initialElements } from "./initialElements";
import { createDropout } from "../nn-elements/layers/basic/DropoutNode";
import { createDense } from "../nn-elements/layers/basic/DenseNode";
import { TensorflowAdapter } from "../../../../adapters/INNLib";

// parameters for react flow
// should be in a global settings context
const snapGrid: SnapGrid = [constants.GRID_SNAP_SIZE, constants.GRID_SNAP_SIZE];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};
let id = 0;
const getId = (): ElementId => `node_${id++}`;

interface Props {
  children?: ReactNode;
}

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/
const NetworkEditor = (props: Props) => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elementsState] = useState<Elements>(initialElements);
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);
  const elements: Elements = [...nodes, ...edges];
  const setElements = useStoreActions((actions) => actions.setElements);

  const networkEditorRef = useRef<HTMLDivElement>(null);

  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const resetSelectedElements = useStoreActions(
    (actions) => actions.resetSelectedElements
  );

  const onLoad = (_reactFlowInstance: OnLoadParams) => {
    if (!reactFlowInstance) {
      setReactFlowInstance(_reactFlowInstance);
      console.log("loaded flow:", _reactFlowInstance);
    }
  };

  const onConnect = (params: Connection | Edge) => {
    console.log("params:", params);
    const sourceNode = elements.find((el) => params.source === el.id);
    if (sourceNode === undefined) return;

    let newEdge: Connection | Edge = params;
    if (!isEdge(params) && params.source !== null && params.target !== null) {
      newEdge = {
        id: `e${params.source}-${params.target}`,
        type: "smoothstep",
        source: params.source,
        target: params.target,
        style: { strokeWidth: 2 },
      };
    }

    setElements(
      addEdge(newEdge, elements).map((el) => {
        if (el.id === params.target) {
          el.data = {
            ...el.data,
            inputValue: sourceNode?.data.outputValue,
            changed: true,
          };
        }
        return el;
      })
    );
    // select the node that got connected
    const targetNode = elements.find((el) => el.id === params.target);
    setSelectedElements([targetNode]);
  };

  const onElementsRemove = (elementsToRemove: Elements) => {
    const removeEdges: Edge[] = elementsToRemove.filter((el) =>
      isEdge(el)
    ) as Edge[];
    console.log("edges to remove", removeEdges);

    console.log("elements to remove", elementsToRemove);
    setElements(
      removeElements(
        elementsToRemove,
        elements.map((el) => {
          if (removeEdges.find((e) => e.target === el.id)) {
            el.data = {
              ...el.data,
              inputValue: undefined,
              changed: true,
            };
          }
          return el;
        })
      )
    );
  };

  const onElementClick = (event: MouseEvent, element: FlowElement) => {
    if (isNode(element)) {
      setSelectedElements([element]);
    }
  };

  const onPaneClick = (event: MouseEvent) => {
    resetSelectedElements();
    console.log("elements: ", elements);
  };

  const onNodeDragStart = (event: React.MouseEvent, element: Node) => {
    setSelectedElements([element]);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (reactFlowInstance) {
      const type = event.dataTransfer.getData("application/reactflow");
      const boundingRect = networkEditorRef.current?.getBoundingClientRect();
      const bounds =
        boundingRect === undefined ? { x: 250, y: 50 } : boundingRect;
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.x - 50,
        y: event.clientY - bounds.y - 80,
      });
      console.log("onDrop: ", type);

      let newNode: Node = { id: "uninit", position: { x: 0, y: 0 } };
      switch (type) {
        case "dense":
          newNode = createDense(getId(), position.x, position.y, new TensorflowAdapter());
          break;
        case "dropout":
          newNode = createDropout(getId(), position.x, position.y, new TensorflowAdapter());
          break;
        default:
          return;
      }
      setElements(elements.concat(newNode));
    }
  };

  return (
    <div
      ref={networkEditorRef}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <ContextMenu>
        <ToolSelectBar />

        <Box sx={{ flex: "auto", overflow: "hidden", height: "100%" }}>
          <ReactFlow
            elements={elementsState}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            snapToGrid={true}
            snapGrid={snapGrid}
            onConnect={onConnect}
            onElementClick={onElementClick}
            onPaneClick={onPaneClick}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onNodeDragStart={onNodeDragStart}
          >
            <Background gap={20} size={0.7} variant={BackgroundVariant.Dots} />
          </ReactFlow>
        </Box>
      </ContextMenu>
    </div>
  );
};

export default NetworkEditor;
