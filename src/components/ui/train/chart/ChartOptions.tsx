import { Check } from "@mui/icons-material";
import { Chip, Grid, Paper, Stack, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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

  const stackRef = React.createRef<HTMLElement>();
  const scrollRef = React.createRef<HTMLElement>();

  const [overflowLeft, setOverflowLeft] = useState(false);
  const [overflowRight, setOverflowRight] = useState(false);

  const handleScroll = () => {
    const stackBRect = stackRef.current?.getBoundingClientRect();
    const scrollBRect = scrollRef.current?.getBoundingClientRect();
    const childBRect =
      stackRef.current?.lastElementChild?.getBoundingClientRect();

    if (stackBRect && scrollBRect && childBRect) {
      setOverflowLeft(stackBRect.left < scrollBRect.left);
      setOverflowRight(childBRect.right > scrollBRect.right);
    }
  };

  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        border: `solid 1px ${theme.palette.divider}`,
        borderRadius: "16px",
        p: "12px",
        px: "20px",
        mb: "16px",
      }}
      elevation={1}
    >
      <Box ref={scrollRef} sx={{ position: "relative" }}>
        {overflowLeft && (
          <KeyboardArrowLeftIcon
            sx={{
              position: "absolute",
              left: "-18px",
              zIndex: 1,
              height: "100%",
              fontSize: "large",
            }}
          />
        )}
        {overflowRight && (
          <KeyboardArrowRightIcon
            sx={{
              position: "absolute",
              right: "-18px",
              zIndex: 1,
              height: "100%",
              fontSize: "large",
            }}
          />
        )}
        <ScrollContainer onScroll={handleScroll}>
          <Stack ref={stackRef} direction="row" spacing={1}>
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
        </ScrollContainer>
      </Box>
    </Paper>
  );
};

export default ChartOptions;
