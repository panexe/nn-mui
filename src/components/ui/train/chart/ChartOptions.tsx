import { Check } from "@mui/icons-material";
import { Chip, Grid, Paper, Stack, useTheme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface ChartOptionsProps {
  lines: string[];
  showLines: boolean[];
  setShowLines: Dispatch<SetStateAction<boolean[]>>;
}

const ChartOptions = ({
  lines,
  showLines,
  setShowLines,
}: ChartOptionsProps) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        border: `solid 1px ${theme.palette.divider}`,
        borderRadius: "16px",
        p: "12px",
        pl: "20px",
        mb: "16px",
      }}
      elevation={1}
    >
      <Stack direction="row" spacing={1}>
        {lines.map((line, index) => {
          return (
            <Chip
            
              key={`chart-options-chip-${line}`}
              sx={{
                borderRadius: "8px",
                backgroundColor: showLines[index]
                  ? "secondary.dark"
                  : "background.default",
              }}
              label={line}
              icon={showLines[index] ? <Check /> : undefined}
              onClick={() => {
                setShowLines((old) => {
                  let newVal = [...old];
                  newVal[index] = !old[index];
                  return newVal;
                });
              }}
            />
          );
        })}
      </Stack>
    </Paper>
  );
};

export default ChartOptions;
