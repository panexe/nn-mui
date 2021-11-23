import {
  AppBar,
  CircularProgress,
  Divider,
  Grid,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const TopBar = () => {
  const theme = useTheme();
  const loading = useSelector<RootState>(
    (state) => state.ui.loading
  ) as boolean;
  const loadingMessage = useSelector<RootState>(
    (state) => state.ui.loadingMessage
  ) as string;

  return (
    <>
      <AppBar
        sx={{
          zIndex: 1,
          backgroundColor: theme.palette.background.paper,
          boxShadow: "none",
        }}
        position="sticky"
        color="transparent"
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-end"
          >
            <Grid item xs={5}></Grid>
            <Grid item>
              <Typography
                sx={{ width: "100%", mr:4 }}
                align="left"
                variant="h6"
                noWrap
                component="div"
              >
                Project Name
              </Typography>
            </Grid>
            <div id="loading-portal"></div>
            <Grid item>
              {loading && <CircularProgress size={20} sx={{mr:2}} />}
            </Grid>
            <Grid item>
              <Typography color={theme.palette.text.secondary}>{loadingMessage}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Divider />
    </>
  );
};

export default TopBar;
