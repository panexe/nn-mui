import { useSelector } from "react-redux";
import { IModel, TensorflowModelAdapter } from "../../../adapters/INNLib";
import { RootState } from "../../../store";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import { LayersModel } from "@tensorflow/tfjs";
import { MnistData } from "../dataset/mnist";
import { train } from "./utils";
import * as Comlink from "comlink";
import { ModelWorkerType } from "../../../train-worker";

import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  buildChartTheme,
  darkTheme,
} from "@visx/xychart";

type Datapoint = {
  epoch: number;
  modelFitTime: number;
  trainLoss: number;
  trainAcc: number;
  valLoss: number;
  valAcc: number;
};

const accessorsLoss = {
  yAccessor: (d: Datapoint) => d.trainLoss,
  xAccessor: (d: Datapoint) => d.epoch,
};

const accesorsAcc = {
  yAccessor: (d: Datapoint) => d.trainAcc,
  xAccessor: (d: Datapoint) => d.epoch,
};

function Sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const Train = () => {
  //const model : undefined | IModel = useSelector<RootState>((state) => state.model.currentModel) as undefined | IModel;
  const modelName: string = useSelector<RootState>(
    (state) => state.model.currentModelName
  ) as string;
  let model: undefined | IModel = undefined;
  const [summary, setSummary] = useState("");
  const [trainProg, setTrainProg] = useState<Datapoint[]>([]);

  const loadModel = async () => {
    return await tf.loadLayersModel(`indexeddb://${modelName}`);
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

  const btnOnClick = async () => {
    const worker = Comlink.wrap<ModelWorkerType>(
      new Worker("../../../train-worker", {
        name: "web-worker",
        type: "module",
      })
    );
    let workerInst = await new worker();
    await workerInst.loadModel(modelName, "adam", "categoricalCrossentropy", [
      "acc",
    ]);
    await workerInst.loadData();

    for (let i = 1; i <= 10; i++) {
      console.log(`epoch ${i} / 10`);
      // insert short sleep for animation
      await Sleep(700);
      const ret = await workerInst.trainEpoch(i);
      setTrainProg((old) => [...old, ret]);
      console.log(ret);
    }
  };

  return (
    <>
      <Button onClick={btnOnClick}>Start Training</Button>
      <Button
        onClick={() => {
          console.log(tf.getBackend());
        }}
      >
        log backend
      </Button>
      <Button
        onClick={() => {
          console.log(tf.memory());
        }}
      >
        log memory usage
      </Button>
      <Card sx={{ margin: 2, padding: 2 }}>
        <XYChart
          height={300}
          xScale={{ type: "band" }}
          yScale={{ type: "linear" }}
          theme={darkTheme}
        >
          <AnimatedAxis orientation="bottom" />
          <AnimatedGrid columns={true} numTicks={4} />
          <AnimatedLineSeries
            dataKey="Loss"
            data={trainProg}
            {...accessorsLoss}
          />
          <AnimatedLineSeries dataKey="Acc" data={trainProg} {...accesorsAcc} />
        </XYChart>
        {summary.split("\n").map((line) => (
          <p>{line}</p>
        ))}
      </Card>
    </>
  );
};

export default Train;
