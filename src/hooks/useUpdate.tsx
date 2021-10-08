import { useContext, useEffect } from "react";
import { getOutgoers } from "react-flow-renderer";
import ModelContext from "../context/model-context";

export const useUpdate = (data: any, id: string, fn: any) => {
  const modelContext = useContext(ModelContext);

  useEffect(() => {
    const currentElement = modelContext.elements.find((el) => el.id === id);

    // no updates necessary if the input hasnt changed

    if (
      currentElement === undefined ||
      currentElement === null ||
      currentElement.data.inputValue === null
    ) {
      return;
    }
    if (currentElement?.data.inputValue === data.inputValue) {
      console.log("currentElement: ", currentElement);
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
    const outputValue = fn(currentElement.data.inputValue);

    // get outgoing connection to update their input values
    const outGoers = getOutgoers(currentElement, modelContext.elements);

    modelContext.setElements((els) => {
      return els.map((el) => {
        // update output value of this node
        if (el.id === id) {
          el.data = {
            ...el.data,
            outputValue,
            changed: false,
          };
        }
        // update input value of all recieving nodes
        if (outGoers.find((target) => target.id === el.id)) {
          el.data = {
            ...el.data,
            inputValue: outputValue,
          };
        }

        return el;
      });
    });
  }, [modelContext.elements]);
};
