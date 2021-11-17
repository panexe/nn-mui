import { useSelector } from "react-redux";
import { IModel, TensorflowModelAdapter } from "../../../adapters/INNLib";
import { RootState } from "../../../store";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { LayersModel } from "@tensorflow/tfjs";
import { MnistData } from "../dataset/mnist";

const Train = () => {
  //const model : undefined | IModel = useSelector<RootState>((state) => state.model.currentModel) as undefined | IModel;
  const modelName: string = useSelector<RootState>(
    (state) => state.model.currentModelName
  ) as string;
  let model: undefined | IModel = undefined;
  const [summary, setSummary] = useState("");

  const loadModel = async () => {
    return await tf.loadLayersModel(`localstorage://${modelName}`);
  };
  useEffect(() => {
    loadModel().then((val) => {
      console.log("model:", val);

      model = new TensorflowModelAdapter(val);
      console.log(model.summary());
      setSummary(model.summary());
    });
  });
  if (modelName.length === 0) {
    return <p>No model available.</p>;
  }

  const trainModel = async () => {
    const data = new MnistData();
    await data.load();

    const metrics = ["loss", "val_loss", "acc", "val_acc"];
    const container = {
      name: "Model Training",
      tab: "Model",
      styles: { height: "1000px" },
    };
    

    const BATCH_SIZE = 512;
    const TRAIN_DATA_SIZE = 5500;
    const TEST_DATA_SIZE = 1000;

    const [trainXs, trainYs] = tf.tidy(() => {
      const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
      return [d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]), d.labels];
    });

    const [testXs, testYs] = tf.tidy(() => {
      const d = data.nextTestBatch(TEST_DATA_SIZE);
      return [d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]), d.labels];
    });

  };

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      {summary.split("\n").map((line) => (
        <p>{line}</p>
      ))}
    </Card>
  );
};

export default Train;
