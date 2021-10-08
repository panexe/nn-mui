/**
 * Maps a tfjs Dense layer to a react-flow node
 *
 */

import { memo, useContext, useEffect, useState } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { useOnConnect } from "../../../../../../hooks/useOnConnect";
import { useUpdate } from "../../../../../../hooks/useUpdate";
import { styled } from "@mui/system";
import { green } from "@mui/material/colors";
import { Typography } from "@mui/material";
import { ACTIVATIONS, getInitializer, Initializer, NodeLayerArgs, getConstraint, getActivation, getRegularizer } from "../..";
import { ActivationIdentifier } from "@tensorflow/tfjs-layers/src/keras_format/activation_config";
import { INITIALIZERS, CONSTRAINTS, REGULARIZERS } from "../..";
import { SymbolicTensor } from "@tensorflow/tfjs-layers";
import { Tensor } from "@tensorflow/tfjs-core";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import ModelContext from "../../../../../../context/model-context";
import theme from "../../../../../../theme";
import { getOutgoers } from "react-flow-renderer";

export interface NodeDenseLayerArgs extends NodeLayerArgs {
  units: number;
  activation?: ACTIVATIONS; // put acceptable types only here
  useBias?: boolean;
  kernelInitializer?: INITIALIZERS;
  biasInitializer?: INITIALIZERS;
  inputDim?: number;
  kernelConstraint?: CONSTRAINTS;
  biasConstraint?: CONSTRAINTS;
  kernelRegularizer?: REGULARIZERS;
  biasRegularizer?: REGULARIZERS;
  activityRegularizer?: REGULARIZERS;
}

export const denseMenu = {
  Options: {
    name: "string",
    units: "number",
    activation: "activation",
    useBias: "boolean",
  },
  "Advanced Options": {
    kernelInitializer: "initializer",
    biasInitializer: "initializer",
    kernelConstraint: "constaint",
    biasConstraint: "constaint",
    kernelRegularizer: "regularizer",
    biasRegularizer: "regularizer",
  },
};

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

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

const DenseNode: React.FC<NodeProps> = ({ data, id, isConnectable }) => {
  const { onSourceConnect, onTargetConnect } = useOnConnect(data, id);
  const modelContext = useContext(ModelContext);
  const selected = modelContext.selectedNodeId === id;

  const [args, setArgs] = useState<NodeDenseLayerArgs>({
    units: 32,
    // set standard values
    activation: ACTIVATIONS.none,
    useBias: true,
    kernelInitializer: INITIALIZERS.none,
    biasInitializer: INITIALIZERS.none,
    kernelConstraint: CONSTRAINTS.none,
    biasConstraint: CONSTRAINTS.none,
    kernelRegularizer: REGULARIZERS.none,
    biasRegularizer: REGULARIZERS.none,
    activityRegularizer: REGULARIZERS.none, // they dont seem supported yet 
  });
  
  useEffect(() => {
    data.menu = denseMenu;
  });
  useEffect(() => {
    data.args = args;
    data.setArgs = setArgs;
    // problem: doesnt update our model-flow when parameters are changed 
    // problem prob. is that instead of chaning the arg a new element is set, 
    // so the arguments did  not really change 
    // maybe update the whole model when something changes 

  },[args] );

  // applys input to this layer
  const fn = (a: SymbolicTensor | SymbolicTensor[]) => {
    const name = data.args.name;
    const units = data.args.units;
    const useBias = data.args.useBias;
    const activation = getActivation(data.args.activation);
    const kernelInitializer = getInitializer(data.args.kernelInitializer);
    const biasInitializer = getInitializer(data.args.biasInitializer);
    const kernelConstraint = getConstraint(data.args.kernelConstraint);
    const biasConstraint = getConstraint(data.args.biasConstraint);
    const kernelRegularizer = getRegularizer(data.args.kernelRegularizer);
    const biasRegularizer = getRegularizer(data.args.biasRegularizer);
    const activityRegularizer = getRegularizer(data.args.activityRegularizer);
    return dense({
      name,
      units,
      activation,
      useBias,
      kernelInitializer, 
      biasInitializer, 
      kernelConstraint, 
      biasConstraint, 
      kernelRegularizer, 
      biasRegularizer, 
      activityRegularizer,
    }).apply(a) as SymbolicTensor;
  };
  useUpdate(data, id, fn);

  

  return (
    <NodeWrapper
      sx={{
        border: selected
          ? `3px solid ${theme.palette.error.light}`
          : `1px solid ${theme.palette.action.disabled}`,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        onConnect={onTargetConnect}
      />
      <div>
        {data.inputValue ? data.inputValue.name : "no layer yet"}
        <p>Dense Node</p>
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

export default memo(DenseNode);
