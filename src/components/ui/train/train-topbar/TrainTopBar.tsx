import { PlayArrow } from "@mui/icons-material";
import { Button, Grid, styled, Typography, useTheme } from "@mui/material";
import chroma from "chroma-js";

const FabButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.text.primary,
  borderRadius: "16px",
  heigh: "32px",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

interface TrainTopBarProps {
  fabOnClick: Function;
}

const TrainTopBar = ({ fabOnClick }: TrainTopBarProps) => {
  const theme = useTheme();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <Grid item>
        <Typography>Epoch: 1/20</Typography>
      </Grid>
      <Grid item>
        <FabButton
          startIcon={<PlayArrow />}
          onClick={() => {
            fabOnClick();
          }}
        >
          Start Training
        </FabButton>
      </Grid>
    </Grid>
  );
};

export default TrainTopBar;
