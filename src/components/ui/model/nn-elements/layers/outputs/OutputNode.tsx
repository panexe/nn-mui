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
} from "react-flow-renderer";

// MUI
import { Card, Typography } from "@mui/material";
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

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const NodeWrapper = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.action.disabled}`,
  padding: 10,
  backgroundColor: purple[800],
  textAlign: "center",
  minWidth: constants.NODE_WIDTH,
  maxWidth: constants.NODE_WIDTH,
  minHeight: constants.NODE_HEIGHT,
  maxHeight: constants.NODE_HEIGHT,

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

  const selectedElements = useStoreState((state) => state.selectedElements);
  const selected =
    selectedElements !== null && selectedElements.find((el) => el.id === id);

  const lib : INNLib = getNNLib(data.libName);

  const [summary, setSummary] = useState("summary");
  //const [layerModel, setLayerModel] = useState<IModel | undefined>();

  // applys input to this layer
  const fn = (input: ILayerOutput<any>) => {
    if (input === undefined) return undefined;

    console.log("output lfn", input);
    const nnModel: IModel = lib.createModel(input.modelInput, input.layerOutput);

    //setLayerModel(nnModel);
    dispatch(modelActions.setCurrentModel(nnModel));
    return nnModel;
  };
  useUpdate(data, id, fn);

  const labelText = "Output";

  useEffect(() => {
    if (model) {
      setSummary(model.summary());
    }
  }, [model]);

  return (
    <NodeWrapper className="drag-handle">
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
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        isConnectable={true} //isConnectable}
        //onConnect={onTargetConnect}
      />
      <div>
        <StyledTypography>{labelText}</StyledTypography>
      </div>
    </NodeWrapper>
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
    },
  }; //as Node<DataBaseType>;
};

export default memo(OutputNode);
