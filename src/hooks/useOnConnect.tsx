import { useContext } from "react";
import { useStoreState } from "react-flow-renderer";
import ModelContext from "../context/model-context";

export const useOnConnect = (data: any, id: string) => {
  const nodes = useStoreState((state) => state.nodes);
  const modelContext = useContext(ModelContext);
  

  // TODO: change params type
  const onTargetConnect = (params: any) => {
    const sourceNode = nodes.find((el) => el.id === params.source);
    console.log("target connected: ", sourceNode?.data.outputValue);
    console.log("source node: ", sourceNode);

    modelContext.setElements((els) => {
      return els.map((el) => {
        if (el.id === id) {
          el.data = {
            ...el.data,
            inputValue: sourceNode?.data.outputValue,
          };
        }
        return el;
      });
    });
  };

  const onSourceConnect = (params: any) => {
    const targetNode = nodes.find((el) => el.id === params.target);
    modelContext.setElements((els) => {
      return els.map((el) => {
        if (el.id === targetNode?.id) {
            el.data = {
                ...el.data, 
                inputValue: data.outputValue,
            }
        }
        return el;
      });
    });
  };
  return {onSourceConnect, onTargetConnect};
};
