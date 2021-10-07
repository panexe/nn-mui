/* 
    Maps the tensorflow.js input layer to a react-flow node. 
    Can only be once in our model (for now). 
*/

import * as tf from "@tensorflow/tfjs";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { getOutgoers, Handle, NodeProps, Position } from "react-flow-renderer";
import { purple } from "@mui/material/colors";
import { memo } from "react";
import ModelContext from "../../../../../../context/model-context";
import { useOnConnect } from "../../../../../../hooks/useOnConnect";
import { DataType } from "@tensorflow/tfjs-core";
import { Shape } from "@tensorflow/tfjs-layers";

/** this basicly is a copy of InputConfig from tfjs
 *  but we want import their type directly
 * 
 * import {InputConfig} from '@tensorflow/tfjs-layers/src/engine/input_layer';
 * (https://github.com/tensorflow/tfjs/blob/38f8462fe642011ff1b7bcbb52e018f3451be58b/tfjs-layers/src/engine/input_layer.ts#L149)
 * 
 * 
 */
export interface InputArgs {
  shape?: Shape;
  batchShape?: Shape;
  name?: string;
  dtype?: DataType;
  sparse?: boolean;
}

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const NodeWrapper = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  padding: 10,
  backgroundColor: purple[800],
  textAlign: "center",
  minWidth: "128px",

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

const InputNode: React.FC<NodeProps> = ({ data, id, isConnectable }) => {
  const modelContext = useContext(ModelContext);
  const { onSourceConnect } = useOnConnect(data, id);
  const [counter, setCounter] = useState(0);
  const [args, setArgs] = useState<InputArgs>({ shape: [32], name:'input' });

  useEffect(() => {
    data.args = args;
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArgs({ shape: [parseInt(event.target.value)] });
    setCounter(parseInt(event.target.value));
  };

  // update outgoing connections
  useEffect(() => {
    const currentElement = modelContext.elements.find((el) => el.id === id);
    if (currentElement === undefined) return; // not elegant, refactor!
    const outGoers = getOutgoers(currentElement, modelContext.elements);
    const outputValue = tf.input(args);

    // put into context for output node to read 
    modelContext.setInputTensor(outputValue);
    console.log(outputValue);
    //outputValue.computeOutputShape();

    modelContext.setElements((els) => [
      ...els.map((el) => {
        if (el.id === id) {
          el.data = {
            ...el.data,
            outputValue,
          };
        }
        if (!!outGoers.find((target) => target.id === el.id)) {
          el.data = {
            ...el.data,
            inputValue: outputValue,
          };
        }

        return el;
      }),
    ]);
  }, [args]);

  const labelText = "Input";

  return (
    <NodeWrapper>
      <StyledTypography>{labelText}</StyledTypography>
      <input type="number" value={counter} onChange={onInputChange} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
        onConnect={onSourceConnect}
      />
    </NodeWrapper>
  );
};

export default memo(InputNode);
