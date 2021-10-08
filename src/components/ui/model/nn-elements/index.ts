import { DataType, Tensor } from "@tensorflow/tfjs-core";
import { regularizers, Shape } from "@tensorflow/tfjs-layers";

/**
 * Copy of tfjs LayerArgs, because we cant import their
 * interface directly
 *
 * https://github.com/tensorflow/tfjs/blob/4dfcd782deda0a9fbe9f3cc5c60bbf4293e14577/tfjs-layers/src/engine/topology.ts#L347
 */
export declare interface NodeLayerArgs {
  inputShape?: Shape;
  batchInputShape?: Shape;
  batchSize?: number;
  dtype?: DataType;
  name?: string;
  trainable?: boolean;
  weights?: Tensor[];
  inputDType?: DataType;
}

export enum INITIALIZERS {
  none = "none", // the value is not used, but we have to use a valid string for type-safety
  constant = "constant",
  glorotNormal = "glorotNormal",
  glorotUniform = "glorotUniform",
  heNormal = "heNormal",
  heUniform = "heUniform",
  identity = "identity",
  leCunNormal = "leCunNormal",
  leCunUniform = "leCunUniform",
  ones = "ones",
  orthogonal = "orthogonal",
  randomNormal = "randomNormal",
  randomUniform = "randomUniform",
  truncatedNormal = "truncatedNormal",
  varianceScaling = "varianceScaling",
  zeros = "zeros",
}

export type Initializer =
  | "constant"
  | "glorotNormal"
  | "glorotUniform"
  | "heNormal"
  | "heUniform"
  | "identity"
  | "leCunNormal"
  | "leCunUniform"
  | "ones"
  | "orthogonal"
  | "randomNormal"
  | "randomUniform"
  | "truncatedNormal"
  | "varianceScaling"
  | "zeros";

export const getInitializer = (initializer: INITIALIZERS) => {
  if (initializer === INITIALIZERS.none) return undefined;
  return INITIALIZERS[initializer];
};

export enum CONSTRAINTS {
  none = "none", // the value is not used, but we have to use a valid string for type-safety
  maxNorm = "maxNorm",
  minMaxNorm = "minMaxNorm",
  nonNeg = "nonNeg",
  unitNorm = "unitNorm",
}

export type Constaint =
  | "maxNorm"
  | "maxNorm"
  | "minMaxNorm"
  | "nonNeg"
  | "unitNorm";

export const getConstraint = (constraint: CONSTRAINTS) => {
  if (constraint === CONSTRAINTS.none) return undefined;
  return CONSTRAINTS[constraint];
};

export enum REGULARIZERS {
  none = "none", // the value is not used, but we have to use a valid string for type-safety
  l1l2 = "l1l2",
}

export type Regularizer = 'l1l2';

export const getRegularizer = (regularizer: REGULARIZERS) => {
    if(regularizer === REGULARIZERS.none) return undefined; 
    return regularizer;
}

export enum ACTIVATIONS {
  none = "none", // the value is not used, but we have to use a valid string for type-safety
  linear = "linear",
  elu = "elu",
  hardSigmoid = "hardSigmoid",
  relu = "relu",
  relu6 = "relu6",
  selu = "selu",
  sigmoid = "sigmoid",
  softmax = "softmax",
  softplus = "softplus",
  softsign = "softsign",
  tanh = "tanh",
  swish = "swish",
  mish = "mish",
}

export const getActivation = (activation: ACTIVATIONS) => {
  if (activation === ACTIVATIONS.none) return undefined;
  return ACTIVATIONS[activation];
};
