/**
 * Maps a tfjs Dense layer to a react-flow node
 *
 */

// REACT
import { memo, ReactNode, useState } from "react";
import { useContext } from "react";

// REACT FLOW
import { Handle, useStoreState } from "react-flow-renderer";
import { NodeProps } from "react-flow-renderer";
import { Position } from "react-flow-renderer";

// TFJS
import { SymbolicTensor } from "@tensorflow/tfjs-layers";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { DenseLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/core";

// MUI
import { styled } from "@mui/system";
import { blue, green, grey } from "@mui/material/colors";
import theme from "../../../../../../theme";

// NNUI
import { useOnConnect } from "../../../../../../hooks/useOnConnect";
import { useUpdate } from "../../../../../../hooks/useUpdate";
import { DataBaseType, layerOutput, Portals } from "../../../../../../types";
import { Alert, Grid } from "@mui/material";
import Portal from "../../../../portal/Portal";

import { createPortal } from "react-dom";

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const NodeWrapper = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  padding: 10,
  backgroundColor: green[800],
  textAlign: "center",
  minWidth: "120px",
  maxWidth: "120px",
  minHeight: "120px",
  maxHeight: "120px",
  overflow: "hidden",

  ".react-flow__handle": {
    background: theme.palette.text.primary,
  },
}));

const NodeTopDiv = styled("div")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
}));

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

export interface BaseNodeProps<T> extends NodeProps<DataBaseType> {
  backgroundColor?: string;
  layerTypeName: string;
  layerFunction: (input: layerOutput | undefined) => layerOutput | undefined;
  args: T;
  menu: ReactNode;
}

const BaseNode = <T,>(props: BaseNodeProps<T>) => {
  console.log("rerender basenode");
  const { data, id, isConnectable } = props;
  const { onSourceConnect, onTargetConnect } = useOnConnect(data, id);

  const selectedElements = useStoreState((state) => state.selectedElements);
  const selected =
    selectedElements !== null &&
    selectedElements.find((el) => el.id === props.id);

  
  useUpdate(data, id, props.layerFunction);


  return (
    <Grid container direction="row">
      {selected && (
        <Portal destination={Portals.layerInfo}>
          {props.menu}
        </Portal>
      )}
      <Grid item>
        <NodeWrapper className='drag-handle'
          sx={{
            border: selected
              ? `4px solid ${blue[800]}`
              : `1px solid ${theme.palette.action.disabled}`,
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : grey[800],
          }}
        >
          <Handle
            type="target"
            position={Position.Top}
            //onConnect={onTargetConnect}
          />
          <div>
            {data.inputValue ? data.inputValue.name : "no layer yet"}
            <p>{props.layerTypeName}</p>
            {data.outputValue ? data.outputValue.name : "no layer yet"}
            {}
          </div>

          <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            //onConnect={onSourceConnect}
            isConnectable={isConnectable}
          />
        </NodeWrapper>
      </Grid>
      <Grid item>
        {data.error.length > 0 && (
          <Alert
            sx={{
              //marginLeft: "auto",
              //marginRight: "auto",
              position: "absolute",
              maxHeight: "120px",
              minWidth: "240px",
              overflow: "clip",
            }}
            severity="error"
          >
            {data.error}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(BaseNode);
