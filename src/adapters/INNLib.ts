// TFJS
import { LayersModel, SymbolicTensor } from "@tensorflow/tfjs";
import { Layer } from "@tensorflow/tfjs-layers/dist/exports_layers";
import "@tensorflow/tfjs-backend-cpu";
import {
  DenseLayerArgs,
  DropoutLayerArgs,
} from "@tensorflow/tfjs-layers/dist/layers/core";
import * as tf from "@tensorflow/tfjs";
import { LayerArgs } from "@tensorflow/tfjs-layers/dist/engine/topology";
import { InputConfig } from "@tensorflow/tfjs-layers/dist/engine/input_layer";

/**
 * Interface that describes a generic arg type.
 * These represent the values a menu-element can take on.
 */
export type IArgType =
  | {
      type: "number" | "float" | "string" | "boolean" | "category";
    }
  | { type: "select"; options: string[] };

export interface ILayerMenu {
  elements: { name: string; type: IArgType }[];
}

// extract generic (arg type) from layer
// god bless this guy
// https://itnext.io/typescript-extract-unpack-a-type-from-a-generic-baca7af14e51
//type ExtractArgType<Layer> = Layer extends INNLayer<infer T> ? T : never;
//export type ExtractLayerType<N> = N extends INNLib<infer T, any> ? T : never;

export type ExtractModelType<N> = N extends INNLib<any, any, any, infer T>
  ? T
  : never;

export interface INNLayer {}

export interface INNLayerArgs {
  name?: string;
}

export interface ILayerPlaceholder {
  shape: Array<null | number>;
}

export interface ILayerFactory<Layer extends INNLayer, LayerArgs> {
  (args: LayerArgs): Layer;
}

export interface ILayerOutput<T> {
  layerOutput: T | T[];
  modelInput: T;
}

export interface ILayer<
  NNLayer extends INNLayer,
  LayerArgs extends INNLayerArgs
> {
  menu: ILayerMenu;
  initialArgs: INNLayerArgs;
  create(args: LayerArgs): NNLayer;
}

export interface ILayerFunction<T> {
  (input: ILayerOutput<T> | undefined): ILayerOutput<T> | undefined;
}

/**
 * Interface for adapter pattern
 */
export interface INNLib<
  LayerType extends INNLayer = any,
  LayerArgs extends INNLayerArgs = any,
  LayerPlaceholder extends ILayerPlaceholder = any,
  ModelType = any
> {
  getOutputShape(layer: LayerType): string;

  /**
   * Connects two (or more) layers
   * @param source
   * @param target
   */
  connect(
    source: ILayerOutput<ILayerPlaceholder>,
    target: any
  ): ILayerOutput<ILayerPlaceholder>;

  createModel(
    input: LayerPlaceholder | LayerPlaceholder[],
    output: LayerPlaceholder
  ): ModelType;

  getAvailableLayers(): { name: string; layer: ILayer<any, any> }[];
  getAvailableLayerNames(): string[];
  getLayerMenu(): { categoryName: string; layers: string[] }[];

  // not totally accurate because tf.input returns a symbolic tensor
  // sould be resolved another way
  input: ILayer<any, any>;
  dense: ILayer<any, any>;
  dropout: ILayer<any, any>;
}

/**
 * Tensorflow Adapter
 */
export class TensorflowAdapter
  implements INNLib<Layer, LayerArgs, SymbolicTensor, LayersModel>
{
  categoryType: IArgType = { type: "category" };
  numberType: IArgType = { type: "number" };
  activationType: IArgType = {
    type: "select",
    options: [
      "none",
      "linear",
      "elu",
      "hardSigmoid",
      "relu",
      "relu6",
      "selu",
      "sigmoid",
      "softmax",
      "softplus",
      "softsign",
      "tanh",
      "swish",
      "mish",
    ],
  };
  initializerType: IArgType = {
    type: "select",
    options: [
      "constant",
      "glorotNormal",
      "glorotUniform",
      "heNormal",
      "heUniform",
      "identity",
      "leCunNormal",
      "leCunUniform",
      "ones",
      "orthogonal",
      "randomNormal",
      "randomUniform",
      "truncatedNormal",
      "varianceScaling",
      "zeros",
    ],
  };

  getOutputShape(layer: Layer) {
    return layer.outputShape.toString();
  }

  connect = (source: ILayerOutput<SymbolicTensor>, target: Layer) => {
    return {
      layerOutput: target.apply(source.layerOutput) as SymbolicTensor,
      modelInput: source.modelInput,
    };
  };

  createModel = (input: tf.SymbolicTensor | [], output: tf.SymbolicTensor) => {
    return tf.model({ inputs: input, outputs: output });
  };

  getAvailableLayers = () => {
    return [
      { name: "dense", layer: this.dense },
      { name: "dropout", layer: this.dropout },
    ];
  };
  getAvailableLayerNames = () => {
    return ["dense", "dropout"];
  };

  getLayerMenu = () => {
    return [
      { categoryName: "basic", layers: ["dense", "dropout"] },
      { categoryName: "advanced", layers: ['input'] },
    ];
  };

  input = {
    menu: {
      elements: [{ name: "options", type: this.categoryType }],
    },
    initialArgs: {
      shape: [32],
      name: undefined,
    },
    create: (args: InputConfig) => {
      return tf.layers.input(args);
    },
  };

  // dense layer
  dense = {
    menu: {
      elements: [
        { name: "options", type: this.categoryType },
        { name: "units", type: this.numberType },
        { name: "activation", type: this.activationType },
      ],
    },
    initialArgs: {
      units: 32,
      name: undefined,
      activation: undefined,
      useBias: true,
      kernelInitializer: undefined,
      biasInitializer: undefined,
      kernelConstraint: undefined,
      biasConstraint: undefined,
      kernelRegularizer: undefined,
      biasRegularizer: undefined,
      trainable: true,
    },

    create: (args: DenseLayerArgs) => {
      return tf.layers.dense(args);
    },
  };

  // dropout
  dropout = {
    menu: {
      elements: [
        { name: "options", type: this.categoryType },
        { name: "rate", type: this.numberType },
      ],
    },
    initialArgs: {
      rate: 0.5,
      name: undefined,
    },
    create: (args: DropoutLayerArgs) => {
      return tf.layers.dropout(args);
    },
  };
}
