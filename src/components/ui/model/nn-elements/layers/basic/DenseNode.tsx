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
import { Activation, NodeLayerArgs } from "../..";
import { ActivationIdentifier } from "@tensorflow/tfjs-layers/src/keras_format/activation_config";
import { Initializer, Constraint, Regularizer } from "../..";
import { SymbolicTensor } from "@tensorflow/tfjs-layers";
import { Tensor } from "@tensorflow/tfjs-core";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import ModelContext from "../../../../../../context/model-context";

export interface NodeDenseLayerArgs extends NodeLayerArgs {
  units: number;
  activation?: Activation;
  useBias?: boolean;
  kernelInitializer?: Initializer;
  biasInitializer?: Initializer;
  inputDim?: number;
  kernelConstraint?: Constraint;
  biasConstraint?: Constraint;
  kernelRegularizer?: Regularizer;
  biasRegularizer?: Regularizer;
  activityRegularizer?: Regularizer;
}

export const denseMenu = {
  Options: { name: 'string', units: "number", activation: "activation", useBias: "boolean" },
  "Advanced Options": {
    kernelInitializer: "initializer",
    biasInitializer: "initializer",
    kernelConstraint: "constaint",
    biasConstraint: "constaint",
    kernelRegularizer: "regularizer",
    biasRegularizer: "regularizer",
    activityRegularizer: "regularizer",
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

  const [args, setArgs] = useState<NodeDenseLayerArgs>({
    units: 32,
    // set standard values
    activation: Activation.none,
    useBias: true,
    kernelInitializer: Initializer.none,
    biasInitializer: Initializer.none,
    kernelConstraint: Constraint.none,
    biasConstraint: Constraint.none,
    kernelRegularizer: Regularizer.none,
    biasRegularizer: Regularizer.none,
    activityRegularizer: Regularizer.none,
  });

  useEffect(() => {
    data.menu = denseMenu;
  });

  useEffect(() => {
    data.args = args;
    if(modelContext.selectedNode.id === id){
      const currentElement = modelContext.elements.find((el) => el.id === id);
    }
  }, [args, setArgs]);

  // applys input to this layer
  const fn = (a: Tensor | Tensor[] | SymbolicTensor | SymbolicTensor[]) => {
    // ugly solution
    let cleanedArgs = { ...args };
    if (args.activation === Activation.none) 
      cleanedArgs.activation = undefined;
    if (args.kernelInitializer === Initializer.none)
      cleanedArgs.kernelInitializer = undefined;
    if (args.biasInitializer === Initializer.none)
      cleanedArgs.biasInitializer = undefined;
    if (args.kernelConstraint === Constraint.none)
      cleanedArgs.kernelConstraint = undefined;
    if (args.biasConstraint === Constraint.none)
      cleanedArgs.biasConstraint = undefined;
    if (args.kernelRegularizer === Regularizer.none)
      cleanedArgs.kernelRegularizer = undefined;
    if (args.biasRegularizer === Regularizer.none)
      cleanedArgs.biasRegularizer = undefined;
    if (args.activityRegularizer === Regularizer.none)
      cleanedArgs.activityRegularizer = undefined;

    //return dense({units:32, kernelRegularizer:null}).apply(a);
    return dense(cleanedArgs).apply(a);
  };
  useUpdate(data, id, fn);

  return (
    <NodeWrapper>
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
