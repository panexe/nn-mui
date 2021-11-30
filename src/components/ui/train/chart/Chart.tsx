import { Paper, Typography, useTheme } from "@mui/material";
import { any } from "@tensorflow/tfjs-core";

import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  buildChartTheme,
  darkTheme,
} from "@visx/xychart";
import { Dispatch, SetStateAction, useState } from "react";
import ChartOptions from "./ChartOptions";

const accessorsLoss = {
  yAccessor: (d: Datapoint) => d.trainLoss,
  xAccessor: (d: Datapoint) => d.epoch,
};

const accesorsAcc = {
  yAccessor: (d: Datapoint) => d.trainAcc,
  xAccessor: (d: Datapoint) => d.epoch,
};

type Datapoint = {
  epoch: number;
  modelFitTime: number;
  trainLoss: number;
  trainAcc: number;
  valLoss: number;
  valAcc: number;
};

interface ChartProps<T> {
  data: T[];
  lines: {
    name: string;
    xAccessor: (d: T) => number;
    yAccessor: (d: T) => number;
  }[];
  showLines: boolean[];
  setShowLines: Dispatch<SetStateAction<boolean[]>>;
}

const Chart = <T,>({ data, lines, showLines, setShowLines }: ChartProps<T>) => {
  const theme = useTheme();
  console.log(darkTheme.colors);

  const chart = (
    <XYChart
      height={412}
      xScale={{ type: "band" }}
      yScale={{ type: "linear" }}
      theme={darkTheme}
    >
      <AnimatedAxis orientation="bottom" />
      <AnimatedAxis orientation="left" />
      <AnimatedGrid columns={true} numTicks={4} />
      {lines.map((val, index) => {
        if (showLines[index]) {
          return (
            <AnimatedLineSeries
              style={{ visibility: showLines[index] ? "visible" : "hidden" }}
              key={val.name}
              dataKey={val.name}
              data={data as any}
              xAccessor={val.xAccessor as any}
              yAccessor={val.yAccessor as any}
            />
          );
        }
      })}
    </XYChart>
  );

  return (
    <>
      <Paper
        sx={{
          height: "512px",
          width: "100%",
          backgroundColor: "background.default",
          border: `solid 1px ${theme.palette.divider}`,
          borderRadius: "16px",
          mb: "16px",
          mt: "16px",
          position: "relative",
        }}
        elevation={1}
      >
        {showLines.filter((val) => val).length === 0 && (
          <Typography
            sx={{
              width: "100%",
              position: "absolute",
              textAlign: "center",
              top: "50%",
              msTransform: "translateY(-50%)",
              transform: " translateY(-50%)",
            }}
            variant="h5"
          >
            No data to show
          </Typography>
        )}
        {showLines.filter((val) => val).length !== 0 && chart}
      </Paper>
      <ChartOptions
        lines={lines.map((val) => val.name)}
        showLines={showLines}
        setShowLines={setShowLines}
      />{" "}
    </>
  );
};

export default Chart;
