// REACT
import { MouseEvent } from "react";
import { useContext } from "react";

// REACT FLOW
import ReactFlow, { removeElements } from "react-flow-renderer";
import { addEdge } from "react-flow-renderer";
import { Background } from "react-flow-renderer";
import { Connection } from "react-flow-renderer";
import { Edge } from "react-flow-renderer";
import { Elements } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { SnapGrid } from "react-flow-renderer";

// NNUI
import ContextMenu from "../../context-menu/ContextMenu";
import ToolSelectBar from "./ToolSelectBar";
import ModelContext from "../../../../context/model-context";
import { nodeTypes } from "../nn-elements/layers";

// MUI
import { Box } from "@mui/material";

// Tensorflow 
// 
import '@tensorflow/tfjs-backend-cpu';

// parameters for react flow
// should be in a global settings context
const snapGrid: SnapGrid = [16, 16];

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/
const NetworkEditor = () => {
  const modelContext = useContext(ModelContext);

  const onConnect = (params: Connection | Edge) => {
    modelContext.setElements((els: Elements) => {
      return addEdge(params, els);
    });
  };

  const onElementsRemove = (elementsToRemove: Elements) => {
    modelContext.setElements((els) => {
      return removeElements(elementsToRemove, els);
    });
  };

  const onNodeDoubleClick = (event: MouseEvent, element: Node) => {
    if (modelContext.setSelectedNodeId) {
      modelContext.setSelectedNodeId(element.id);
    }
    console.log("doubleclick: ", element);
  };

  return (
    <div
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
            elements={modelContext.elements}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={snapGrid}
            onConnect={onConnect}
            onNodeDoubleClick={onNodeDoubleClick}
            onElementsRemove={onElementsRemove}
          >
            <Background gap={16} size={1} />
          </ReactFlow>
        </Box>
      </ContextMenu>
    </div>
  );
};

export default NetworkEditor;
