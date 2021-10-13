// REACT FLOW
import { Edge, ElementId, Node, XYPosition } from "react-flow-renderer";
import { useStoreActions } from "react-flow-renderer";

// REACT
import { useContext, useEffect } from "react";

// NNUI
import ModelContext from "../context/model-context";

export const useCloseConnect = (
  edgeId: ElementId,
  closeEnough: boolean,
  sourceHandlePos: XYPosition
) => {
  const modelContext = useContext(ModelContext);
  const updateNodePosDiff = useStoreActions((actions) => actions.updateNodePosDiff);
  const updateNodePos = useStoreActions((actions) => actions.updateNodePos);

  useEffect(() => {
    if (closeEnough) {
      // get all involved nodes
      const edge = modelContext.elements.find((el) => el.id === edgeId) as Edge;
      const sourceNode = modelContext.elements.find(
        (el) => el.id === edge.source
      ) as Node;
      const targetNode = modelContext.elements.find(
        (el) => el.id === edge.target
      ) as Node;

      updateNodePos({id: targetNode, pos: sourceNode.position});
      /* modelContext.setElements((els) => {
        return els.map((el) => {
          if(el.id === edge.target){
              const edge: Node = {
                  ...el, 
                  position: {x: sourceHandlePos.x, y: sourceHandlePos.y},
              };
              return edge;
              (el as Node).position = sourceHandlePos;
          }
          return el;
        });
      }); */
    }
  }, [closeEnough]);
};
