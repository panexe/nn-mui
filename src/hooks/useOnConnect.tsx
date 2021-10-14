import { useContext } from "react";
import { Elements, useStoreActions, useStoreState } from "react-flow-renderer";

export const useOnConnect = (data: any, id: string) => {
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);
  const elements: Elements = [...nodes, ...edges];
  const setElements = useStoreActions((actions) => actions.setElements);


  // TODO: change params type
  const onTargetConnect = (params: any) => {
    const sourceNode = nodes.find((el) => el.id === params.source);
    console.log("target connected: ", sourceNode?.data.outputValue);
    console.log("source node: ", sourceNode);

    setElements(
      elements.map((el) => {
        if (el.id === id) {
          el.data = {
            ...el.data,
            inputValue: sourceNode?.data.outputValue,
          };
        }
        return el;
      })
    );
  };

  const onSourceConnect = (params: any) => {
    console.log("|| source connected: ", params);

    const targetNode = nodes.find((el) => el.id === params.target);
    setElements(
      elements.map((el) => {
        if (el.id === targetNode?.id) {
          el.data = {
            ...el.data,
            inputValue: data.outputValue,
            changed: true,
          };
        }
        return el;
      })
    );
  };
  return { onSourceConnect, onTargetConnect };
};
