import { useSelector } from "react-redux";
import { IModel, TensorflowModelAdapter } from "../../../adapters/INNLib";
import { RootState } from "../../../store";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";

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

  return (
    <Card sx={{margin:2, padding: 2}}>
      {summary.split("\n").map((line) => (
        <p>{line}</p>
      ))}
    </Card>
  );
};

export default Train;
