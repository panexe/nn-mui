/**
 * Maps a tfjs Dense layer to a react-flow node
 *
 */

// REACT
import { memo } from "react";
import { useContext } from "react";

// REACT FLOW
import { Handle } from "react-flow-renderer";
import { NodeProps } from "react-flow-renderer";
import { Position } from "react-flow-renderer";

// TFJS
import { SymbolicTensor } from "@tensorflow/tfjs-layers";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { DenseLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/core";

// MUI
import { styled } from "@mui/system";
import { green } from "@mui/material/colors";
import theme from "../../../../../../theme";

// NNUI
import ModelContext from "../../../../../../context/model-context";
import { useOnConnect } from "../../../../../../hooks/useOnConnect";
import { useUpdate } from "../../../../../../hooks/useUpdate";
import { DataBaseType } from "../../../../../../types";


/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const NodeWrapper = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  padding: 10,
  backgroundColor: green[800],
  textAlign: "center",
  minWidth: "128px",

  ".react-flow__handle": {
    background: theme.palette.text.primary,
  },
}));

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

export interface BaseNodeProps extends NodeProps<DataBaseType>{
    layerTypeName: string;
    layerFunction: (input: SymbolicTensor | SymbolicTensor[] | undefined ) => SymbolicTensor | undefined;
};


const BaseNode: React.FC<NodeProps<DataBaseType>> = (props) => {
  const { data, id, isConnectable } = props;
  console.log(props.data);

  const { onSourceConnect, onTargetConnect } = useOnConnect(data, id);
  const modelContext = useContext(ModelContext);
  const selected = modelContext.selectedNodeId === id;

  //props.getLayerFunction(data);

  useUpdate(data, id, data.getLayerFunction(data.args));

  return (
    <NodeWrapper
      sx={{
        border: selected
          ? `3px solid ${theme.palette.error.light}`
          : `1px solid ${theme.palette.action.disabled}`,
        backgroundColor: data.backgroundColor? data.backgroundColor : green[800],
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        onConnect={onTargetConnect}
      />
      <div>
        {data.inputValue ? data.inputValue.name : "no layer yet"}
        <p>{data.args.name ? data.args.name : "node name"}</p>
        {data.outputValue ? data.outputValue.name : "no layer yet"}
        {}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        onConnect={onSourceConnect}
        isConnectable={isConnectable}
      />
    </NodeWrapper>
  );
};

export default memo(BaseNode);
