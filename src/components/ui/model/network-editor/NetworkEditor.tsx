// REACT
import { MouseEvent, useRef, useState } from "react";
import { useContext } from "react";
import { DragEvent } from "react";

// REACT FLOW
import ReactFlow, { removeElements } from "react-flow-renderer";
import { addEdge } from "react-flow-renderer";
import { Background } from "react-flow-renderer";
import { Connection } from "react-flow-renderer";
import { Edge } from "react-flow-renderer";
import { Elements } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { SnapGrid } from "react-flow-renderer";
import { OnLoadParams } from "react-flow-renderer";
import { ElementId } from "react-flow-renderer";

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
import { createDenseFromBase } from "../nn-elements/layers/basic/DenseFromBase";
import { createDropoutFromBase } from "../nn-elements/layers/basic/DropoutNode";

// parameters for react flow
// should be in a global settings context
const snapGrid: SnapGrid = [16, 16];

const onDragOver = (event: DragEvent) => {
  event.preventDefault(); 
  event.dataTransfer.dropEffect = 'move';
};
let id = 0; 
const getId = (): ElementId => `node_${id++}`;

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/
const NetworkEditor = () => {
  const networkEditorRef = useRef<HTMLDivElement>(null);

  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const modelContext = useContext(ModelContext);

  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);

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

  const onDrop = (event: DragEvent) => {
    event.preventDefault(); 

    if(reactFlowInstance){
      console.log("onDrop");
      const type = event.dataTransfer.getData('application/reactflow'); 

      const boundingRect = networkEditorRef.current?.getBoundingClientRect();
      const bounds = boundingRect === undefined ? {x: 250, y:50} : boundingRect;
      const position = reactFlowInstance.project({ x : event.clientX - bounds.x - 50, y: event.clientY - bounds.y - 80});
      console.log('onDrop: ', type);

      let newNode : Node;
      switch (type){
        case 'dense':
          newNode = createDenseFromBase(getId(), position.x, position.y);
          break; 
        case 'dropout':
          newNode = createDropoutFromBase(getId(), position.x, position.y);
          break;
        default: 
          return;
      } 
      modelContext.setElements((el) => el.concat(newNode));
        
    }
  }
  console.log('bounding rect: ',networkEditorRef.current?.getBoundingClientRect());


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
            elements={modelContext.elements}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={snapGrid}
            onConnect={onConnect}
            onNodeDoubleClick={onNodeDoubleClick}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <Background gap={16} size={1} />
          </ReactFlow>
        </Box>
      </ContextMenu>
    </div>
  );
};

export default NetworkEditor;
