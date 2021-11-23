import { expose } from "comlink";
import { ILayer, INNLib } from "../../../../../../adapters/INNLib";

export const service = {
  getShape: (layer: ILayer<any, any>, lib: INNLib) => {
    const shape = lib.getOutputShape(layer);
    return shape;
  },
};

expose(service);
