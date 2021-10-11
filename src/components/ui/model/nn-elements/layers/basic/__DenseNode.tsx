/**
 * Maps a tfjs Dense layer to a react-flow node
 *
 */

// REACT
import { memo } from "react";
import { useContext } from "react";
import { useEffect } from "react";

// REACT FLOW
import { Handle, Node } from "react-flow-renderer";
import { NodeProps } from "react-flow-renderer";
import { Position } from "react-flow-renderer";

// TFJS
import { SymbolicTensor } from "@tensorflow/tfjs-layers";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import {DenseLayerArgs} from '@tensorflow/tfjs-layers/dist/layers/core';

// MUI
import { styled } from "@mui/system";
import { green } from "@mui/material/colors";
import theme from "../../../../../../theme";

// NNUI
import ModelContext from "../../../../../../context/model-context";
import { useOnConnect } from "../../../../../../hooks/useOnConnect";
import { useUpdate } from "../../../../../../hooks/useUpdate";
import {
  INITIALIZERS,
  CONSTRAINTS,
  REGULARIZERS,
  ACTIVATIONS,
  getInitializer,
  getConstraint,
  getActivation,
  getRegularizer,
} from "../..";

/*--------------------------------------------------------*/
/*                      DATATYPES                         */
/*--------------------------------------------------------*/

/*type DenseLayerArgs = {
  name: string;
  units: number;
  activation: Activation;
  useBias: boolean;
  kernelInitializer: Initializer;
  biasInitializer: Initializer;
  kernelConstraint: Constraint;
  biasConstraint: Constraint;
  kernelRegularizer: Regularizer;
  biasRegularizer: Regularizer;
  activityRegularizer: Regularizer;
};*/

/**
 * here the options the sidebar lets you change are listed
 *
 */
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
    kernelConstraint: "constraint",
    biasConstraint: "constraint",
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

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

export const createDenseNode = (id :string, posX: number, posY: number) => {
  return {
    id: id,
    type: "denseNode",

    position: { x: posX, y: posY },
    data: {
      inputValue: undefined,
      outputValue: undefined,
      args: {
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
      },
      menu: {
        Options: {
          name: "string",
          units: "number",
          activation: "activation",
          useBias: "boolean",
        },
        "Advanced Options": {
          kernelInitializer: "initializer",
          biasInitializer: "initializer",
          kernelConstraint: "constraint",
          biasConstraint: "constraint",
          kernelRegularizer: "regularizer",
          biasRegularizer: "regularizer",
        },
      },
      changed: true,
    },
  } as Node;
};


const DenseNode: React.FC<NodeProps> = ({ data, id, isConnectable }) => {
  const { onSourceConnect, onTargetConnect } = useOnConnect(data, id);
  const modelContext = useContext(ModelContext);
  const selected = modelContext.selectedNodeId === id;

  // applys input to this layer
  const fn = (a: SymbolicTensor | SymbolicTensor[] | undefined) => {
    if (a === undefined) return a;

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
      name: name,
      units: units,
      activation: activation,
      useBias: useBias,
      kernelInitializer: kernelInitializer,
      biasInitializer: biasInitializer,
      kernelConstraint: kernelConstraint,
      biasConstraint: biasConstraint,
      kernelRegularizer: kernelRegularizer,
      biasRegularizer: biasRegularizer,
      activityRegularizer: activityRegularizer,
    } as DenseLayerArgs).apply(a) as SymbolicTensor;
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
        <p>{data.args.name ? data.args.name : "Dense Node"}</p>
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
