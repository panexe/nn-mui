// REACT
import React, {
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { DragEvent } from "react";

// REACT FLOW
import ReactFlow, {
  BackgroundVariant,
  FlowElement,
  FlowExportObject,
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
import { getNodeTypes } from "../nn-elements/layers";

// MUI
import { Box, useTheme } from "@mui/material";

// Tensorflow
//
import "@tensorflow/tfjs-backend-cpu";

import { edgeTypes } from "../edges";
import * as constants from "../../../../constants/constants";
import { getInitialElements } from "./initialElements";
import { getPlacementOffset } from "./utils";
import { createNode } from "../nn-elements/layers/basic/LayerNode";

import localforage from "localforage";
import SidebarFloat from "../sidebar/SidebarFloat";
import ArgumentFloat from "../layer-info/ArgumentFloat";
import { DataBaseType } from "../../../../types";

localforage.config({ name: "react-flow-config", storeName: "flows" });
const flowKey = "nnui-flow";

// parameters for react flow
// should be in a global settings context
const snapGrid: SnapGrid = [constants.GRID_SNAP_SIZE, constants.GRID_SNAP_SIZE];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

interface Props {
  children?: ReactNode;
  libName: string;
}

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/
const NetworkEditor = (props: Props) => {
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elementsState] = useState<Elements>(getInitialElements());
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);
  const elements: Elements = [...nodes, ...edges];
  const setElements = useStoreActions((actions) => actions.setElements);
  const theme = useTheme();

  const networkEditorRef = useRef<HTMLDivElement>(null);

  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );
  const resetSelectedElements = useStoreActions(
    (actions) => actions.resetSelectedElements
  );

  const getId = (nodeType: string = 'node'): ElementId => {
    let idNum = 0;
    let res: undefined | Node = undefined;
    do {
      res = nodes.find((node) => node.id === `nodeType_${idNum++}`);
    } while (res !== undefined);

    return `nodeType_${idNum++}`;
  };

  const onLoad = (_reactFlowInstance: OnLoadParams) => {
    if (!reactFlowInstance) {
      setReactFlowInstance(_reactFlowInstance);
      console.log("loaded flow:", _reactFlowInstance);
    }
    onRestore();
  };

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const newElements = flow.elements.map((el) => {
        if (isNode(el)) {
          el.data.outputValue = undefined;
          el.data.inputValue = undefined;
        }
        return el;
      }) as Elements;

      flow.elements = newElements;

      localforage.setItem(flowKey, flow);
      console.log("flow storage", flow);
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = await localforage.getItem(flowKey);

      if (flow) {
        setElements(
          (flow as FlowExportObject).elements.map((el) => {
            if (isNode(el)) {
              el.data.fromLoad = true;
            }
            return el;
          }) || []
        );
      }
    };
    restoreFlow();
  }, [setElements]);

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
    setElements(
      elements.map((el) => {
        if (el.id === element.id) {
          return {
            ...el,
            data: { ...el.data, isDragged: true, dragOffset: 10 },
          } as Node<DataBaseType>;
        }
        return el;
      })
    );
  };

  const onNodeDragStop = (event: React.MouseEvent, element: Node) => {
    const newElements = elements.map((el) => {
      if (el.id === element.id) {
        (el as Node).position.x = Math.round(element.position.x);
        (el as Node).position.y = Math.round(element.position.y);
      }
      return el;
    });

    const newX = getPlacementOffset(nodes, element);
    setElements(
      newElements.map((el) => {
        if (isNode(el) && el.id === element.id) {
          return {
            ...el,
            position: { x: newX, y: el.position.y },
            data: { ...el.data, isDragged: false, dragOffset: 0 },
          } as Node<DataBaseType>;
        }
        return el;
      })
    );
    return;
  };

  const onNodeDrag = (event: MouseEvent, element: Node) => {
    const newElements = elements.map((el) => {
      if (el.id === element.id) {
        (el as Node).position.x = Math.round(element.position.x);
        (el as Node).position.y = Math.round(element.position.y);
      }
      return el;
    });

    const newX = getPlacementOffset(nodes, element);
    setElements(
      newElements.map((el) => {
        if (isNode(el) && el.id === element.id) {
          return {
            ...el,
            data: { ...el.data, dragOffset: newX - element.position.x },
          } as Node<DataBaseType>;
        }
        return el;
      })
    );
    return;
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

      let newNode = createNode(
        type,
        getId(),
        position.x,
        position.y,
        props.libName
      );
      if (newNode !== null) {
        setElements(elements.concat(newNode));
      }
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
        <ToolSelectBar onSave={onSave} onRestore={onRestore} />

        {
          /*maybe needed again, if not delete */ false &&
            nodes.map((node) => (
              <div key={node.id}>
                Node {node.id} - x: {node.__rf.position.x.toFixed(2)}, y:{" "}
                {node.__rf.position.y.toFixed(2)}
              </div>
            ))
        }

        <Box sx={{ flex: "auto", overflow: "hidden", height: "100%" }}>
          <ReactFlow
            elements={elementsState}
            nodeTypes={getNodeTypes("tensorflow")}
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
            onNodeDragStop={onNodeDragStop}
            onNodeDrag={onNodeDrag}
          >
            <SidebarFloat
              style={{
                top: "40%",
                transform: "translate(0, -50%)",
                left: "24px",
                position: "relative",
                zIndex: 5,
              }}
            />
            <ArgumentFloat
              style={{
                top: "40%",
                transform: "translate(0, -50%)",
                right: "24px",
                position: "absolute",
                zIndex: 5,
              }}
            />
            <Background
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.secondary,
              }}
              gap={20}
              color={theme.palette.text.secondary}
              size={0.7}
              variant={BackgroundVariant.Dots}
            />
          </ReactFlow>
        </Box>
      </ContextMenu>
    </div>
  );
};

export default NetworkEditor;
