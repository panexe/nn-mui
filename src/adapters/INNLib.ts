// TFJS
import { SymbolicTensor } from "@tensorflow/tfjs";
import { input } from "@tensorflow/tfjs-layers";
import { dense } from "@tensorflow/tfjs-layers/dist/exports_layers";
import { model } from "@tensorflow/tfjs-layers";
import { LayersModel } from "@tensorflow/tfjs-layers";
import "@tensorflow/tfjs-backend-cpu";
import {
  DenseLayerArgs,
  DropoutLayerArgs,
} from "@tensorflow/tfjs-layers/dist/layers/core";
import * as tf from "@tensorflow/tfjs";

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

export interface INNLayer {
  apply(input: any): any;
}

export interface ILayerPlaceholder {
  shape: Array<null | number>;
}

export interface ILayerFactory<Layer extends INNLayer, LayerArgs> {
  (args: LayerArgs): Layer;
}

export interface ILayerOutput<T> {
  layerOutput: T;
  modelInput: T;
}

export interface ILayerFunction<T> {
  (input: ILayerOutput<T> | undefined): ILayerOutput<T> | undefined;
}

export interface INNLib {
  dense: ILayerFactory<any, any>;
  dropout: ILayerFactory<any, any>;
}

export class TensorflowAdapter implements INNLib {
  dense = (args: DenseLayerArgs) => {
    return tf.layers.dense(args);
  };

  dropout = (args: DropoutLayerArgs) => {
    return tf.layers.dropout(args);
  };
}
