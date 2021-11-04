import {
  Divider,
  Grid,
  GridSize,
  InputLabel,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

interface DimensionInputProps {
  min: number;
  max: number;
  value: number[];
  setValue:
    | React.Dispatch<React.SetStateAction<number[]>>
    | ((val: number[]) => void);
}

const DimensionInput = ({ min, max, value, setValue }: DimensionInputProps) => {
  const dim = value.length;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    let newVal = 0;
    if (Array.isArray(newValue)) {
      newVal = newValue[0];
      console.error("Slider in DimensionInput should not return an array!");
    } else {
      newVal = newValue;
    }

    let ret = new Array(newVal).fill(1);
    for (let i = 0; i < newValue && i < value.length; i++) {
      ret[i] = value[i];
    }
    setValue(ret);
  };

  const createHandleInputChange = (n: number) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = parseInt(event.target.value);
      let ret = [...value]; 
      ret[n] = newVal;
      setValue(ret);
    };
  };

  let numberInputs = [];
  for (let i = 0; i < dim; i++) {
    numberInputs.push(
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <InputLabel>{`dim-${i} size:`}</InputLabel>
        </Grid>
        <Grid item xs={8}>
          <TextField
            //inputRef={ref}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            variant="standard"
            margin="none"
            onChange={createHandleInputChange(i)}
            value={value[i]}
            fullWidth
            //onFocus={props.onFocus}
          />
        </Grid>
      </Grid>
    );
  }

  let marks = [];
  for (let i = 1; i <= max; i++) {
    marks.push({ value: i, label: `${i}` });
  }

  return (
    <div
      style={{
        padding: "1px",
        border: "solid 0px",
        borderColor: "white",
      }}
    >
      <Divider />
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Grid
            spacing={1}
            container
            columns={max * 2}
            justifyContent="space-evenly"
            alignItems="stretch"
          >
            {numberInputs.map((val) => {
              console.log(
                "max/dim",
                max / dim,
                Math.round(Math.floor(max / dim) * 2)
              );
              return (
                <Grid
                  xs={
                    max / dim < 12
                      ? (Math.round(Math.floor(max / dim) * 2) as GridSize)
                      : "auto"
                  }
                  item
                >
                  {val}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <Typography>Dimensions:</Typography>
          <Slider
            defaultValue={min}
            valueLabelDisplay="auto"
            step={1}
            min={min}
            max={max}
            onChange={handleSliderChange}
            marks={marks}
            value={dim}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default DimensionInput;