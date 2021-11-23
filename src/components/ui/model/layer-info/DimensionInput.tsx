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
  id: string;
}

const DimensionInput = ({ min, max, value, setValue, id }: DimensionInputProps) => {
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
  const showLabels = false;

  let numberInputs = [];
  for (let i = 0; i < dim; i++) {
    numberInputs.push(
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        key={`${id}-diminput_grid-${i}`}
      >
        <Grid item xs={8} key={`diminput_grid-${i}-item`}>
          <TextField
            //inputRef={ref}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*", style:{textAlign: 'center'} }}
            variant="standard"
            margin="none"
            onChange={createHandleInputChange(i)}
            value={value[i]}
            fullWidth
            key={`${id}-diminput_grid-${i}-textinput`}
            //onFocus={props.onFocus}
          />
        </Grid>

        {showLabels && (
          <Grid item key={`${id}-diminput_grid-${i}-item2`}>
            <InputLabel key={`${id}-diminput_grid-${i}-inputlabel`}>{`${i},`}</InputLabel>
          </Grid>
        )}
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
        maxWidth: "500px",
      }}
    >
      <Divider />
      <Grid container direction="column" justifyContent="center">
        <Grid item>
          <Typography>Size of each dimension:</Typography>
          <Grid
            spacing={1}
            container
            columns={max * 2 + 8}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">[</Typography>
            </Grid>
            {numberInputs.map((val, index) => {
              console.log(
                "max/dim",
                max / dim,
                Math.round(Math.floor(max / dim) * 2)
              );
              return (
                <React.Fragment key={`${id}-diminput-fragment-jsx-${index}`}>
                  <Grid
                    key={`${id}-diminput_grid-item-jsx-${index}`}
                    item
                    xs={
                      max / dim < 12
                        ? (Math.round(Math.floor(max / dim) * 2) as GridSize)
                        : "auto"
                    }
                  >
                    {val}
                  </Grid>
                  {index !== numberInputs.length - 1 && (
                    <Typography variant="h4" key={`${id}-diminput-dash-jsx-${index}`}>,</Typography>
                  )}
                </React.Fragment>
              );
            })}
            <Grid item>
              <Typography variant="h4">]</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item>
          <Typography>Number of dimensions:</Typography>
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
