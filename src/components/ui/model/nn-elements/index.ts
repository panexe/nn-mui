// TFJS
import { DataType } from "@tensorflow/tfjs-core";
import { Tensor } from "@tensorflow/tfjs-core";
import { Shape } from "@tensorflow/tfjs-layers";

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

/**
 * Enum of available initlializers in tfjs.
 * - Has the none option, which tfjs does not accept
 * -> none must be converted to undefined before passing to a layer
 */
export enum INITIALIZERS {
  none = "none",
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

/**
 * covers all string literals that are valid initializer types
 */
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

/**
 * Converts the initlializer enum to a string thats accepted by tfjs
 *
 * @param initializer enum value for initializer
 * @returns initlializer string literal
 */
export const getInitializer = (initializer: INITIALIZERS) => {
  if (initializer === INITIALIZERS.none) return undefined;
  return INITIALIZERS[initializer];
};

/**
 * Enum of available constraints in tfjs.
 * - Has the none option, which tfjs does not accept
 * -> none must be converted to undefined before passing to a layer
 */
export enum CONSTRAINTS {
  none = "none", // the value is not used, but we have to use a valid string for type-safety
  maxNorm = "maxNorm",
  minMaxNorm = "minMaxNorm",
  nonNeg = "nonNeg",
  unitNorm = "unitNorm",
}

/**
 * covers all string literals that are valid constraint types
 */
export type Constaint =
  | "maxNorm"
  | "maxNorm"
  | "minMaxNorm"
  | "nonNeg"
  | "unitNorm";

  /**
   * Converts a constraint enum value to a string tfjs accepts. 
   * 
   * @param constraint CONSTRAINS enum value
   * @returns 
   */
export const getConstraint = (constraint: CONSTRAINTS) => {
  if (constraint === CONSTRAINTS.none) return undefined;
  return CONSTRAINTS[constraint];
};

/**
 * Enum of available regularizers in tfjs.
 * - Has the none option, which tfjs does not accept
 * -> none must be converted to undefined before passing to a layer
 */
export enum REGULARIZERS {
  none = "none", // the value is not used, but we have to use a valid string for type-safety
  l1l2 = "l1l2",
}

/**
 * covers all string literals that are valid regularizer types
 */
export type Regularizer = "l1l2";

export const getRegularizer = (regularizer: REGULARIZERS) => {
  if (regularizer === REGULARIZERS.none) return undefined;
  return regularizer;
};

/**
 * Enum of available activations in tfjs.
 * - Has the none option, which tfjs does not accept
 * -> none must be converted to undefined before passing to a layer
 */
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

/**
 * covers all string literals that are valid activation types
 */
export type Activation =
  | "elu"
  | "hardSigmoid"
  | "linear"
  | "relu"
  | "relu6"
  | "selu"
  | "sigmoid"
  | "softmax"
  | "softplus"
  | "softsign"
  | "tanh"
  | "swish"
  | "mish";

/**
 * 
 * @param activation ACTIVATIONS enum value
 * @returns 
 */
export const getActivation = (activation: ACTIVATIONS) => {
  if (activation === ACTIVATIONS.none) return undefined;
  return ACTIVATIONS[activation];
};
