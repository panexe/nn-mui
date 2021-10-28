/* 
    Maps the tensorflow.js input layer to a react-flow node. 
    Can only be once in our model (for now). 
*/

// REACT
import { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";

// REACT FLOW
import {
  Elements,
  getOutgoers,
  useStoreActions,
  useStoreState,
} from "react-flow-renderer";
import { Handle } from "react-flow-renderer";
import { NodeProps } from "react-flow-renderer";
import { Position } from "react-flow-renderer";
import { Node } from "react-flow-renderer";

// MUI
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { purple } from "@mui/material/colors";

// NNUI
import { DataBaseType, Portals } from "../../../../../../types";
import { TensorflowAdapter } from "../../../../../../adapters/INNLib";
import Portal from "../../../../portal/Portal";



/** this basicly is a copy of InputConfig from tfjs
 *  but we want import their type directly
 *
 * import {InputConfig} from '@tensorflow/tfjs-layers/src/engine/input_layer';
 * (https://github.com/tensorflow/tfjs/blob/38f8462fe642011ff1b7bcbb52e018f3451be58b/tfjs-layers/src/engine/input_layer.ts#L149)
 *
 *
 */


/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const NodeWrapper = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  padding: 10,
  backgroundColor: purple[800],
  textAlign: "center",
  minWidth: "240px",
  maxWidth: "240px",
  minHeight: "80px",
  maxHeight: "80px",

  ".react-flow__handle": {
    background: theme.palette.text.primary,
    top: "auto",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

const InputNode = ({ data, id, isConnectable }: NodeProps<DataBaseType>) => {
  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);
  const elements: Elements = [...nodes, ...edges];
  const setElements = useStoreActions((actions) => actions.setElements);

  const selectedElements = useStoreState((state) => state.selectedElements);
  const selected =
    selectedElements !== null &&
    selectedElements.find((el) => el.id === id);

  const [counter, setCounter] = useState(0);
  const [args, setArgs] = useState<typeof data.lib.input.initialArgs>(
    data.lib.input.initialArgs
  );

  const labelText = "Input";


  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArgs((old) => {
      return { ...old, shape: [parseInt(event.target.value)] };
    });
    setCounter(parseInt(event.target.value));
  };

  // update outgoing connections
  useEffect(() => {
    const currentElement = nodes.find((el) => el.id === id);
    if (currentElement === undefined) return; // not elegant, refactor!
    const outGoers = getOutgoers(currentElement, elements);

    const layer = data.lib.input.create(args);
    const outputValue = { layerOutput: layer, modelInput: layer };

    setElements(
      elements.map((el) => {
        if (el.id === id) {
          el.data = {
            ...el.data,
            args: args,
            outputValue: outputValue,
          };
        }
        if (!!outGoers.find((target) => target.id === el.id)) {
          el.data = {
            ...el.data,
            inputValue: outputValue,
            changed: true,
          };
        }

        return el;
      })
    );
  }, [args]);

  return (
    <>
    {selected && (
      <Portal destination={Portals.layerInfo} id={id}>
        {"Test"}
      </Portal>
    )}
    <NodeWrapper>
      <StyledTypography>{labelText}</StyledTypography>
      <input type="number" value={counter} onChange={onInputChange} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
        //onConnect={onSourceConnect}
      />
    </NodeWrapper>
    </>
  );
};

export const createInput = (
  id: string,
  posX: number,
  posY: number
): Node<DataBaseType> => {
  return {
    id: id,
    type: "inputNode",
    position: { x: posX, y: posY },
    //dragHandle: ".drag-handle",
    data: {
      inputValue: undefined,
      outputValue: undefined,
      changed: true,
      error: "",
      layerName: "input",
      lib: new TensorflowAdapter(),
    },
  }; //as Node<DataBaseType>;
};

export default memo(InputNode);
