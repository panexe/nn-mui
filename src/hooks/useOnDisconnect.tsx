import { useContext } from "react";
import { useStoreState } from "react-flow-renderer";
import ModelContext from "../context/model-context";

export const useOnDisconnect = (data: any, id: string) => {
  const nodes = useStoreState((state) => state.nodes);
  const modelContext = useContext(ModelContext);

  // TODO: change params type
  const onTargetDisconnect = (params: any) => {
    console.log("disconnect params: ", params);
    const sourceNode = nodes.find((el) => el.id === params.source);
    console.log("target disconnected: ", sourceNode?.data.outputValue);
    console.log("source node: ", sourceNode);

    modelContext.setElements((els) => {
      return els.map((el) => {
        if (el.id === id) {
          el.data = {
            ...el.data,
            inputValue: undefined,
          };
        }
        return el;
      });
    });
  };

  const onSourceDisconnect = (params: any) => {
    const targetNode = nodes.find((el) => el.id === params.target);
    modelContext.setElements((els) => {
      return els.map((el) => {
        if (el.id === targetNode?.id) {
          el.data = {
            ...el.data,
            inputValue: undefined,
          };
        }
        return el;
      });
    });
  };
  return { onSourceDisconnect, onTargetDisconnect };
};
