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
import { FlattenLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/core";
import { ConvLayerArgs } from "@tensorflow/tfjs-layers/dist/layers/convolutional";
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
  categories: {
    categoryName: string;
    values: { name: string; type: IArgType }[];
  }[];
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

export interface IModel {
  model: any;
  summary(): string;
  save(path: string): string | Promise<string>;
}

/**
 * Interface for adapter pattern
 */
export interface INNLib<
  LayerType extends INNLayer = any,
  LayerArgs extends INNLayerArgs = any,
  LayerPlaceholder extends ILayerPlaceholder = any,
  ModelType extends IModel = any
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

export const getNNLib = (name: string) => {
  switch (name) {
    case "tensorflow":
      return new TensorflowAdapter();
    default:
      // tensorflow as fallback
      return new TensorflowAdapter();
  }
};

/**
 * Tensorflow Adapter
 */

export class TensorflowModelAdapter implements IModel {
  model: LayersModel;

  constructor(inputModel: LayersModel) {
    this.model = inputModel;
  }
  summary() {
    let ret = "";
    this.model.summary(
      undefined,
      undefined,
      (message?: any, ...optionalParams: any[]) => {
        ret += (message as string) + "\n";
      }
    );
    return ret;
  }
  async save(path: string) {
    let ret = "";
    await this.model.save(path).then((res) => {
      console.log(res);
      ret =
        "date saved: " +
        res.modelArtifactsInfo.dateSaved.toDateString() +
        "responses: " +
        res.responses?.map((val) => val.text).join(" ") +
        " errors: " +
        res.errors?.map((val) => val.toString());
    });
    return ret;
  }
}

export class TensorflowAdapter
  implements INNLib<Layer, LayerArgs, SymbolicTensor, TensorflowModelAdapter>
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
    return layer.outputShape
      .map((val) => (val === null ? "None" : val.toString()))
      .join(",");
  }

  connect = (source: ILayerOutput<SymbolicTensor>, target: Layer) => {
    return {
      layerOutput: target.apply(source.layerOutput) as SymbolicTensor,
      modelInput: source.modelInput,
    };
  };

  createModel = (input: tf.SymbolicTensor | [], output: tf.SymbolicTensor) => {
    return new TensorflowModelAdapter(
      tf.model({ inputs: input, outputs: output })
    );
  };

  getAvailableLayers = () => {
    return [
      { name: "dense", layer: this.dense },
      { name: "dropout", layer: this.dropout },
      { name: "flatten", layer: this.flatten },
    ];
  };
  getAvailableLayerNames = () => {
    return ["dense", "dropout", "flatten"];
  };

  getLayerMenu = () => {
    return [
      { categoryName: "basic", layers: ["dense", "dropout", "flatten"] },
      { categoryName: "advanced", layers: ["input"] },
    ];
  };

  input = {
    menu: {
      categories: [
        {
          categoryName: "options",
          values: [],
        },
      ],
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
      categories: [
        {
          categoryName: "basic",
          values: [
            { name: "units", type: this.numberType },
            { name: "activation", type: this.activationType },
          ],
        },
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
      categories: [
        {
          categoryName: "basic",
          values: [{ name: "rate", type: this.numberType }],
        },
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

  // flatten
  flatten = {
    menu: {
      categories: [],
    },
    initialArgs: {
      name: undefined,
    },
    create: (args: FlattenLayerArgs) => {
      return tf.layers.flatten(args);
    },
  };

  
}
