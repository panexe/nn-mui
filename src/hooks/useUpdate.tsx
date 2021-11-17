// REACT
import { useEffect } from "react";

// REACT-FLOW
import { Elements } from "react-flow-renderer";
import { getOutgoers } from "react-flow-renderer";
import { Node } from "react-flow-renderer";
import { useStoreActions } from "react-flow-renderer";
import { useStoreState } from "react-flow-renderer";
import { ILayerFunction, ILayerOutput } from "../adapters/INNLib";

// NN-UI
import { DataBaseType } from "../types";

export const useUpdate = (
  data: DataBaseType,
  id: string,
  fn: ILayerFunction<any> 
) => {
  const setElements = useStoreActions((actions) => actions.setElements);
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);
  const elements: Elements = [...nodes, ...edges];

  useEffect(() => {
    const currentElement = nodes.find((el) => el.id === id) as Node<DataBaseType> | undefined;

    // only proceed when input values are valid
    if (
      currentElement === undefined ||
      currentElement === null ||
      currentElement.data?.inputValue === null
    ) {
      console.log(
        currentElement?.type,
        "node ",
        id,
        " | no change because no input"
      );
      return;
    }
    // update after deletion
    if (
      currentElement.data?.inputValue === undefined &&
      !currentElement?.data?.changed
    ) {
      console.log(
        currentElement?.type,
        "node ",
        id,
        " | no change because input still is undefined"
      );
      return;
    }
    // update after argument change inside of
    if (currentElement.data.inputValue === data.inputValue) {
      //console.log("currentElement: ", currentElement);
      // no updates necessary if the input hasnt changed
      if (!currentElement.data.changed) {
        console.log(
          currentElement?.type,
          "node",
          id,
          " | no change because has old value"
        );
        return;
      }
    }
    console.log(currentElement?.type, "node ", id, " | change");

    // calc output value | should be the connection of the layers here later on
    let outputValue: ILayerOutput<any> | undefined = undefined;
    let error = "";
    let connectable = true;
    // catching the errors produced by tfjs to show them in the node
    try {
      outputValue = fn(currentElement.data.inputValue);
    } catch (e) {
      outputValue = undefined;
      error = (e as Error).message;

      console.log("call stack: ", (e as Error).stack?.toString());
      console.log(currentElement.data.inputValue);
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
