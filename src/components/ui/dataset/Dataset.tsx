import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { createRef, useState } from "react";
import { MnistData } from "./mnist";
import * as tf from "@tensorflow/tfjs";
import { Tensor2D } from "@tensorflow/tfjs";

const Dataset = () => {
  const [ds, setDs] = useState("");
  const [images, setImages] = useState([]);
  const divRef = createRef<HTMLDivElement>();

  const handleDsChange = (event: SelectChangeEvent) => {
    setDs(event.target.value as string);
  };

  const btnOnClick = async () => {
    // empty the div 
    if (divRef.current) {
      while(divRef.current.childNodes.length >= 1){
        divRef.current.removeChild(divRef.current.children[0]);
      }
    }

    let ret = [];
    const data = new MnistData();
    await data.load();

    const examples = data.nextTestBatch(20);
    const numExamples = examples.xs.shape[0];

    for (let i = 0; i < numExamples; i++) {
      const imageTensor = tf.tidy(() => {
        return examples.xs
          .slice([i, 0], [1, examples.xs.shape[1]])
          .reshape([28, 28, 1]);
      });
      const canvas = document.createElement('canvas');
      canvas.width = 28; 
      canvas.height = 28; 
      await tf.browser.toPixels(imageTensor as Tensor2D, canvas); 
      divRef.current?.appendChild(canvas);
      imageTensor.dispose();
      //tf.browser.toPixels();
    }
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Dataset</InputLabel>
        <Select value={ds} label="Dataset" onChange={handleDsChange}>
          <MenuItem value={"mnist"}>MNIST</MenuItem>
        </Select>
        <Button onClick={btnOnClick}>Show examples!</Button>
      </FormControl>
      <div ref={divRef}>
      </div>
    </>
  );
};

export default Dataset;
