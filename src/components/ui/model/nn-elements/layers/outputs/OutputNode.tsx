/* 
    Maps the tensorflow.js input layer to a react-flow node. 
    Can only be once in our model (for now). 
*/

// REACT
import { useEffect } from "react";
import { memo, useState } from "react";

// REACT-FLOW
import {
  Handle,
  NodeProps,
  Position,
  Node,
  useStoreState,
  getIncomers,
  useStoreActions,
} from "react-flow-renderer";

// MUI
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { purple } from "@mui/material/colors";

// NNUI
import { useUpdate } from "../../../../../../hooks/useUpdate";
import { DataBaseType, Portals } from "../../../../../../types";

import {
  getNNLib,
  ILayerOutput,
  IModel,
  INNLib,
} from "../../../../../../adapters/INNLib";
import Portal from "../../../../portal/Portal";
import ArgsMenu from "../../../layer-info/ArgsMenu";
import * as constants from "../../../../../../constants/constants";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../../../store";
import { modelActions } from "../../../../../../store/model";
import { NODE_HEIGHT, NODE_WIDTH } from "../../../../../../constants/constants";
import { createLayersIcon } from "../../../../../icons/LayersIcon/LayersIcon";

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const NodeWrapper = styled("div")(({ theme }) => ({
  outline: `1px solid ${theme.palette.action.disabled}`,
  padding: 0,
  borderRadius: "4px",
  backgroundColor: theme.palette.background.paper,
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

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

const OutputNode = ({ data, id, isConnectable }: NodeProps<DataBaseType>) => {
  const dispatch = useAppDispatch();
  const model: undefined | IModel = useSelector<RootState>(
    (state) => state.model.currentModel
  ) as undefined | IModel;
  const modelName: string = useSelector<RootState>(
    (state) => state.model.currentModelName
  ) as string;

  const theme = useTheme();

  const selectedElements = useStoreState((state) => state.selectedElements);
  const selected =
    selectedElements !== null && selectedElements.find((el) => el.id === id);

  const lib: INNLib = getNNLib(data.libName);

  const [summary, setSummary] = useState("summary");
  //const [layerModel, setLayerModel] = useState<IModel | undefined>();

  const nodes = useStoreState((state) => state.nodes);
  const edges = useStoreState((state) => state.edges);
  const elements = [...nodes, ...edges];
  const setElements = useStoreActions((actions) => actions.setElements);

  if (data.fromLoad) {
    data.fromLoad = false;
  }

  const updateModel = async () => {
    if (
      data.inputValue !== undefined &&
      data.changed === true &&
      data.fromLoad === false
    ) {
      console.log(
        "call createModel with",
        data.inputValue.modelInput,
        data.inputValue.layerOutput
      );

      const nnModel: IModel = lib.createModel(
        data.inputValue.modelInput,
        data.inputValue.layerOutput
      );
      //dispatch(modelActions.setCurrentModel(nnModel));
      const saveResults = await nnModel.save(`localstorage://${modelName}`);
      console.log("save results:", saveResults, modelName);
    } else {
      console.log("done nothing in output node");
    }
  };

  useEffect(() => {
    updateModel();
  }, [data]);

  // applys input to this layer
  const fn = async (input: ILayerOutput<any> | undefined) => {
    if (input === undefined) return undefined;

    console.log("output lfn", input);
    const nnModel: IModel = lib.createModel(
      input.modelInput,
      input.layerOutput
    );
    dispatch(modelActions.setCurrentModel(nnModel));
    const saveResults = await nnModel.save(`localstorage://${modelName}`);
    console.log("save results:", saveResults, modelName);
  };

  //useUpdate(data, id, fn);

  const labelText = "Output";

  useEffect(() => {
    if (model) {
      setSummary(model.summary());
    }
  }, [model]);

  return (
    <>
      {selected && (
        <Portal destination={Portals.layerInfo} id={id}>
          <ArgsMenu>
            <Typography variant="h4" mt={2}>
              {labelText}
            </Typography>
            {summary.length === 1 && <p>No summary available.</p>}
            {summary.length > 1 && (
              <Card sx={{ padding: "12px" }}>
                <Typography>{summary}</Typography>
              </Card>
            )}
          </ArgsMenu>
        </Portal>
      )}

      <NodeWrapper
        className="drag-handle"
        sx={{
          outline: selected
            ? `3px solid ${theme.palette.primary.main}`
            : "none",
          border: `1px solid ${"#8338EC"}`,
          borderRadius: "4px",
          p: 0,
          boxSizing: "border-box",
          WebkitBoxSizing: "border-box",
        }}
      >
        <Handle
          type="target"
          position={Position.Top}
          id="a"
          isConnectable={true} //isConnectable}
          //onConnect={onTargetConnect}
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
                backgroundColor: "#8338EC88",
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
                <Typography sx={{ fontSize: "14pt" }}>Output</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </NodeWrapper>
    </>
  );
};

export const createOutput = (
  id: string,
  posX: number,
  posY: number,
  libName: string
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
      libName: libName,
      dragOffset: 0, 
      isDragged: false,
    },
  }; //as Node<DataBaseType>;
};

export default memo(OutputNode);
