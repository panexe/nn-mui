import { useContext, useEffect } from "react";
import {
  Elements,
  getOutgoers,
  Node,
  useStore,
  useStoreActions,
  useStoreState,
} from "react-flow-renderer";
import { DataBaseType } from "../types";

export const useUpdate = (data: DataBaseType, id: string, fn: any) => {
  const setElements = useStoreActions((actions) => actions.setElements);
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);
  const elements: Elements = [...nodes,...edges];

  useEffect(() => {
    const currentElement = nodes.find((el) => el.id === id);

    // only proceed when input values are valid
    if (
      currentElement === undefined ||
      currentElement === null ||
      currentElement.data.inputValue === null ||
      currentElement.data.inputValue === undefined
    ) {
      return;
    }
    if (currentElement.data.inputValue === data.inputValue) {
      console.log("currentElement: ", currentElement);
      // no updates necessary if the input hasnt changed
      if (currentElement.data.changed) {
        console.log(
          "update because data changed!",
          currentElement,
          data.inputValue
        );
      } else {
        console.log(
          "no update in useupdate: ",
          currentElement,
          data.inputValue
        );
        return;
      }
    }

    // calc output value | should be the connection of the layers here later on
    let outputValue: any = undefined;
    let error = "";
    let connectable = true;
    // catching the errors produced by tfjs to show them in the node
    try {
      outputValue = fn(currentElement.data.inputValue);
    } catch (e) {
      error = (e as Error).message;
      connectable = false;
    }

    // get outgoing connection to update their input values
    const outGoers = getOutgoers(currentElement, elements);

    // update nodes 
    setElements(
      elements.map((el) => {
        // update output value of this node
        if (el.id === id) {
          el.data = {
            ...el.data,
            outputValue,
            changed: false,
            error: error,
          };
          (el as Node).connectable = connectable;
        }
        // update input value of all recieving nodes
        if (outGoers.find((target) => target.id === el.id)) {
          el.data = {
            ...el.data,
            inputValue: outputValue,
            changed: true,
          };
        }
        return el;
      })
    );
  }, [elements]);
};
