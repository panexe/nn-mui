import { useContext, useEffect } from "react";
import { getOutgoers } from "react-flow-renderer";
import ModelContext from "../context/model-context";
import { DataBaseType } from "../types";

export const useUpdate = (data: DataBaseType, id: string, fn: any) => {
  const modelContext = useContext(ModelContext);

  useEffect(() => {
    const currentElement = modelContext.elements.find((el) => el.id === id);

    // no updates necessary if the input hasnt changed

    if (
      currentElement === undefined ||
      currentElement === null ||
      currentElement.data.inputValue === null ||
      currentElement.data.inputValue === undefined
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
    let outputValue: any = undefined;
    let error = '';
    try{
      outputValue = fn(currentElement.data.inputValue);  
    }catch (e){
        error = (e as Error).message;
    }
    

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
            error: error,
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
