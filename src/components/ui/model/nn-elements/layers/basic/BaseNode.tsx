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
import { palette, styled } from "@mui/system";
import { blue, green, grey } from "@mui/material/colors";
import theme from "../../../../../../theme";
import Portal from "@mui/material/Portal";

// NNUI
import { useUpdate } from "../../../../../../hooks/useUpdate";
import { DataBaseType, Portals } from "../../../../../../types";
import {
  Alert,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
//import Portal from "../../../../portal/Portal";

import { NODE_HEIGHT, NODE_WIDTH } from "../../../../../../constants/constants";
import { ILayerFunction, INNLib } from "../../../../../../adapters/INNLib";
import { useTheme } from "@mui/material";
import { SettingsInputComponent } from "@mui/icons-material";
import { createLayersIcon } from "../../../../../icons/LayersIcon/LayersIcon";

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const NodeWrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  minWidth: NODE_WIDTH,
  maxWidth: NODE_WIDTH,
  minHeight: NODE_HEIGHT,
  maxHeight: NODE_HEIGHT,
  overflow: "hidden",
  borderRadius: "4px",

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
  color?: string;
}

/**
 *
 * @param props
 * @returns
 */
const BaseNode = (props: BaseNodeProps) => {
  const { data, id, isConnectable } = props;
  const theme = useTheme();

  const selectedElements = useStoreState((state) => state.selectedElements);
  const selected =
    selectedElements !== null &&
    selectedElements.find((el) => el.id === props.id);

  useUpdate(data, id, props.layerFunction);

  const portalDest = document.getElementById(Portals.layerInfo);

  return (
    <Grid container direction="row">
      {selected && <Portal container={portalDest}>{props.menu}</Portal>}
      <Grid item>
        <NodeWrapper
          className="drag-handle"
          sx={{
            outline: selected
              ? `3px solid ${theme.palette.primary.main}`
              : "none",
            border: `1px solid ${"#FF006E"}`,
            backgroundColor: theme.palette.background.paper,
            p: 0,
            boxSizing: "border-box",
            WebkitBoxSizing: "border-box",
          }}
        >
          <Handle
            type="target"
            position={Position.Top}

            //onConnect={onSourceConnect}
          />
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ height: NODE_HEIGHT, width: "100%" }}
          >
            <Grid item>
              <Box
                sx={{
                  height: NODE_HEIGHT,
                  width: NODE_HEIGHT,
                  backgroundColor: "#FF006E88",
                }}
              >
                <Container
                  disableGutters
                  sx={{
                    position: "relative",
                    top: "60%",
                    transform: "translate(0, -50%)",
                  }}
                >
                  {createLayersIcon("32px")}
                </Container>
              </Box>
            </Grid>
            <Grid item sx={{ pl: "16px" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="baseline"
              >
                <Grid item>
                  <Typography sx={{ fontSize: "14pt" }}>
                    {props.layerTypeName.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "11pt",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    [{props.children}]
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

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
