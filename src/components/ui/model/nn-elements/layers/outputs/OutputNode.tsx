/* 
    Maps the tensorflow.js input layer to a react-flow node. 
    Can only be once in our model (for now). 
*/

import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useContext, useEffect } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { purple } from "@mui/material/colors";
import { memo, useState } from "react";
import { useUpdate } from "../../../../../../hooks/useUpdate";
import ModelContext from "../../../../../../context/model-context";
import { useOnConnect } from "../../../../../../hooks/useOnConnect";
import { model, SymbolicTensor } from "@tensorflow/tfjs-layers";

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

const OutputNode: React.FC<NodeProps> = ({ data, id, isConnectable }) => {
  const modelContext = useContext(ModelContext);
  const { onTargetConnect } = useOnConnect(data, id);
  const [summary, setSummary] = useState(["summary"]);

  // applys input to this layer
  const fn = (a: SymbolicTensor | SymbolicTensor[]) => {
    const nnModel = model({ inputs: modelContext.inputTensor, outputs: a });
    modelContext.setModel(nnModel);
    return nnModel;
  };
  useUpdate(data, id, fn);

  const labelText = "Output";

  useEffect(() => {
    setSummary(["summary: "]);
    // put summary to screen
    if (modelContext.model) {
      modelContext.model.summary(
        undefined,
        undefined,
        (message?: any, ...optionalParams: any[]) => {
          setSummary((oldSummary) => [...oldSummary, message as string]);
        }
      );
    }
    console.log("summary: ", summary);
  }, [modelContext.model]);

  return (
    <NodeWrapper>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={isConnectable}
        onConnect={onTargetConnect}
      />

      <StyledTypography>{labelText}</StyledTypography>
      {summary.length === 1 && <p>No summary available.</p>}
      {summary.length > 1 &&
        summary.map((line, index) => {
          return <p key={`$output-node-p-${index}`}>{line}</p>;
        })}
    </NodeWrapper>
  );
};

export default memo(OutputNode);
