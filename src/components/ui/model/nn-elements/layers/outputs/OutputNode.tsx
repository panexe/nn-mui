/* 
    Maps the tensorflow.js input layer to a react-flow node. 
    Can only be once in our model (for now). 
*/

// REACT 
import {  useEffect } from "react";
import { memo, useState } from "react";

// REACT-FLOW
import { Handle, NodeProps, Position, Node } from "react-flow-renderer";


// MUI
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { purple } from "@mui/material/colors";

// NNUI
import { useUpdate } from "../../../../../../hooks/useUpdate";
import { DataBaseType} from "../../../../../../types";


import { ExtractModelType, ILayerOutput, TensorflowAdapter } from "../../../../../../adapters/INNLib";


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
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

const OutputNode = ({ data, id, isConnectable }: NodeProps<DataBaseType>) => {  
  
  const [summary, setSummary] = useState(["summary"]);
  const [layerModel, setLayerModel] = useState<ExtractModelType<typeof data.lib> | undefined>();

  // applys input to this layer
  const fn = (input: ILayerOutput<any>) => {
    if(input === undefined) return undefined;

    console.log('output lfn',input);
    const nnModel = data.lib.createModel(input.modelInput, input.layerOutput);

    setLayerModel(nnModel);
    return nnModel;
  };
  useUpdate(data, id, fn);

  const labelText = "Output";

  useEffect(() => {
    setSummary(["summary: "]);
    // put summary to screen
    if (layerModel) {
      layerModel.summary(
        undefined,
        undefined,
        (message?: any, ...optionalParams: any[]) => {
          setSummary((oldSummary) => [...oldSummary, message as string]);
        }
      );
    }
    console.log("summary: ", summary);
    // eslint-disable-next-line
  }, [layerModel]);

  return (
    <NodeWrapper>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={ true }//isConnectable}
        //onConnect={onTargetConnect}
      />

      <StyledTypography>{labelText}</StyledTypography>
      {summary.length === 1 && <p>No summary available.</p>}
      {summary.length > 1 &&
        summary.map((line, index) => {
          return <Typography key={`$output-node-p-${index}`}>{line}</Typography>;
        })}
    </NodeWrapper>
  );
};

export const createOutput = (
  id: string,
  posX: number,
  posY: number
): Node<DataBaseType> => {
  return {
    id: id,
    type: "outputNode",
    position: { x: posX, y: posY },
    //dragHandle: ".drag-handle",
    data: {
      inputValue: undefined,
      outputValue: undefined,
      changed: true,
      error: "",
      layerName: "output",
      lib: new TensorflowAdapter(),
    },
  }; //as Node<DataBaseType>;
};

export default memo(OutputNode);
