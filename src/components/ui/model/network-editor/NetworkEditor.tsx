import { Box } from "@mui/material";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Edge,
  Elements,
  Node,
  SnapGrid,
} from "react-flow-renderer";
import ContextMenu from "../../context-menu/ContextMenu";
import ToolSelectBar from "./ToolSelectBar";
import ModelContext from "../../../../context/model-context";

import { DenseNode } from "../nn-elements/layers";
import InputNode from "../nn-elements/layers/inputs/InputNode";
import { MouseEvent, useContext, useEffect } from "react";
import OutputNode from "../nn-elements/layers/outputs/OutputNode";

const snapGrid: SnapGrid = [16, 16];
const nodeTypes = {
  denseNode: DenseNode,
  inputNode: InputNode,
  outputNode: OutputNode,
};

const NetworkEditor = () => {
  const modelContext = useContext(ModelContext);


  const onConnect = (params: Connection | Edge) => {
    console.log("on connect", params);
    modelContext.setElements((els: Elements) => {
      return addEdge(params, els);
    });
  };

  const onNodeDoubleClick = (event: MouseEvent, element: Node) => {
    if (modelContext.setSelectedNode) {
      modelContext.setSelectedNode(element);
      modelContext.setSelectedNodeId(element.id);
    }
    console.log("double clicked: ", element);
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
          >
            <Background gap={16} size={1} />
          </ReactFlow>
        </Box>
      </ContextMenu>
    </div>
  );
};

export default NetworkEditor;
