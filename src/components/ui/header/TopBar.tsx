import { AppBar, Divider, Toolbar, Typography } from "@mui/material";
import useTheme from "@mui/system/useTheme";

const TopBar = () => {
  const theme = useTheme();

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
          <Typography
            sx={{ width: "100%" }}
            align="center"
            variant="h6"
            noWrap
            component="div"
          >
            Project Name
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
    </>
  );
};

export default TopBar;
