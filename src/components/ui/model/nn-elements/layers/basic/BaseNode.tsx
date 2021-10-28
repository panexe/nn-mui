/**
 * Maps a tfjs Dense layer to a react-flow node
 *
 */

// REACT
import { memo, ReactNode } from "react";

// REACT FLOW
import { Handle, useStoreState } from "react-flow-renderer";
import { NodeProps } from "react-flow-renderer";
import { Position } from "react-flow-renderer";

// MUI
import { styled } from "@mui/system";
import { blue, green, grey } from "@mui/material/colors";
import theme from "../../../../../../theme";

// NNUI
import { useUpdate } from "../../../../../../hooks/useUpdate";
import { DataBaseType, Portals } from "../../../../../../types";
import { Alert, Grid } from "@mui/material";
import Portal from "../../../../portal/Portal";

import { NODE_HEIGHT, NODE_WIDTH } from "../../../../../../constants/constants";
import { ILayerFunction, INNLib } from "../../../../../../adapters/INNLib";

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const NodeWrapper = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  padding: 10,
  backgroundColor: green[800],
  textAlign: "center",
  minWidth: NODE_WIDTH,
  maxWidth: NODE_WIDTH,
  minHeight: NODE_HEIGHT,
  maxHeight: NODE_HEIGHT,
  overflow: "hidden",

  ".react-flow__handle": {
    background: theme.palette.text.primary,
  },
}));

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

export interface BaseNodeProps extends NodeProps<DataBaseType> {
  backgroundColor?: string;
  layerTypeName: string;
  layerFunction: ILayerFunction<any>;
  menu: ReactNode;
  children?: ReactNode;
  lib: INNLib;
}

/**
 * 
 * @param props 
 * @returns 
 */
const BaseNode = (props: BaseNodeProps) => {
  const { data, id, isConnectable } = props;

  const selectedElements = useStoreState((state) => state.selectedElements);
  const selected =
    selectedElements !== null &&
    selectedElements.find((el) => el.id === props.id);

  useUpdate(data, id, props.layerFunction);

  return (
    <Grid container direction="row">
      {selected && (
        <Portal destination={Portals.layerInfo} id={id}>
          {props.menu}
        </Portal>
      )}
      <Grid item>
        <NodeWrapper
          className="drag-handle"
          sx={{
            border: selected
              ? `4px solid ${blue[800]}`
              : `1px solid ${theme.palette.action.disabled}`,
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : grey[800],
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <Handle
            type="target"
            position={Position.Top}

            //onConnect={onSourceConnect}
          />
          <div>
            <p>{props.layerTypeName}</p>
            <p>Dim: {props.children}</p>
          </div>

          <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            //onConnect={onTargetConnect}
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
