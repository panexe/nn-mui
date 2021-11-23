import * as tf from "@tensorflow/tfjs";
import { MnistData } from "../components/ui/dataset/mnist";

interface Layers {
  [key: string]: tf.SymbolicTensor;
}

export class ModelWorker {
  model: tf.LayersModel | undefined;
  data: MnistData;
  BATCH_SIZE: number;
  TRAIN_DATA_SIZE: number;
  TEST_DATA_SIZE: number;
  trainXs: any;
  trainYs: any;
  testXs: any;
  testYs: any;

  constructor() {
    this.data = new MnistData();

    this.BATCH_SIZE = 512;
    this.TRAIN_DATA_SIZE = 5500;
    this.TEST_DATA_SIZE = 1000;
  }
  async loadModel(
    modelName: string = "my-model",
    optimizer: string = "adam",
    loss: "categoricalCrossentropy",
    metrics: string[] = ["acc"]
  ) {
    console.log("loading model...");
    this.model = await tf.loadLayersModel(`indexeddb://${modelName}`);
    this.model.compile({ optimizer: optimizer, loss: loss, metrics: metrics });
  }

  async loadData() {
    const profile = await tf.profile(async () => {
      await this.data.load();

      [this.trainXs, this.trainYs] = tf.tidy(() => {
        const d = this.data.nextTrainBatch(this.TRAIN_DATA_SIZE);
        return [d.xs.reshape([this.TRAIN_DATA_SIZE, 28, 28, 1]), d.labels];
      });

      [this.testXs, this.testYs] = tf.tidy(() => {
        const d = this.data.nextTestBatch(this.TEST_DATA_SIZE);
        return [d.xs.reshape([this.TEST_DATA_SIZE, 28, 28, 1]), d.labels];
      });
    });
    console.log("in load data");
    console.log(`newBytes: ${profile.newBytes}`);
    console.log(`newTensors: ${profile.newTensors}`);
    console.log(
      `byte usage over all kernels: ${profile.kernels.map(
        (k) => k.totalBytesSnapshot
      )}`
    );
  }

  async trainEpoch(n: number = -1) {
    if (this.model === undefined) {
      throw new Error(
        "No model is defined. Create one before you start training."
      );
    }
    
    const beginMs = performance.now();
    const hist = await this.model.fit(this.trainXs, this.trainYs, {
      epochs: 1,
      batchSize: this.BATCH_SIZE,
      validationData: [this.testXs, this.testYs],
      yieldEvery: "epoch",
    });

    const elapsedMs = performance.now() - beginMs;
    const modelFitTime = elapsedMs / 1000;

    const trainLoss = hist.history["loss"][0] as number;
    const trainAcc = hist.history["acc"][0] as number;
    const valLoss = hist.history["loss"][0] as number;
    const valAcc = hist.history["acc"][0] as number;

    return {
      epoch: n,
      modelFitTime: modelFitTime,
      trainLoss: trainLoss,
      trainAcc: trainAcc,
      valLoss: valLoss,
      valAcc: valAcc,
    };
  }
}

export default ModelWorker;
