import {
  CSSObject,
  Divider,
  Grid,
  IconButton,
  List,
  Theme,
  Typography,
} from "@mui/material";
import DrawerItem from "./DrawerItem";
import { styled } from "@mui/material/styles";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiDrawer from "@mui/material/Drawer";
import { createDatasetIcon } from "../../icons/DatasetIcon/DatasetIcon";
import { createEvaluateIcon } from "../../icons/EvaluateIcon/EvaluateIcon";
import { createTrainIcon } from "../../icons/TrainIcon/TrainIcon";
import { createNetworkIcon } from "../../icons/NetworkIcon/NetworkIcon";
import { createSettingsIcon } from "../../icons/SettingsIcon/SettingsIcon";
import { useTheme } from "@mui/material";

const drawerWidth = "256px";

const topTabs = [
  { text: "DATASET", icon: createDatasetIcon, tabIndex: 0 },
  { text: "MODEL", icon: createNetworkIcon, tabIndex: 1 },
  { text: "TRAIN", icon: createTrainIcon, tabIndex: 2 },
  { text: "EVAL", icon: createEvaluateIcon, tabIndex: 3 },
];

const bottomTabs = [
  { text: "SETTINGS", icon: createSettingsIcon, tabIndex: 4 },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const VariableDrawer = () => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen((old) => !old);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{ height: "100vh", overflow: "visible" }}
      PaperProps={{
        style: {
          height: "100%",
          overflow: "visible",
          backgroundColor: theme.palette.background.default,
          border: 'none',
        },
      }}
      open={open}
    >
      <DrawerHeader sx={{ p: 0, overflow: "visible" }}>
        <>
          <Grid
            alignItems="center"
            sx={{
              width: "100%",
              position: "absolute",
            }}
          >
            <Grid item>
              <Typography
                fontFamily="Roboto Mono"
                fontStyle="regular"
                align="center"
                fontSize="21pt"
                color="text.primary"
              >
                NNUI
              </Typography>
            </Grid>
          </Grid>

          <IconButton
            sx={{ left: "48px", zIndex: "0", position: "relative" }}
            onClick={toggleDrawer}
          >
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </>
      </DrawerHeader>
      <>
        <Divider />
        <List>
          {topTabs.map(({ text, icon, tabIndex }, index) => (
            <DrawerItem
              open={open}
              icon={icon}
              name={text}
              tabIndex={tabIndex}
              key={`drawer-item-${text}`}
            />
          ))}
        </List>
        <Grid
          sx={{ height: "100%", width: "100%" }}
          alignItems="stretch"
          container
          alignContent="flex-end"
        >
          <Grid item>
            <List sx={{ width: "100%" }}>
              {bottomTabs.map(({ text, icon, tabIndex }, index) => (
                <DrawerItem
                  open={open}
                  icon={icon}
                  name={text}
                  tabIndex={tabIndex}
                  key={`drawer-item-${text}`}
                />
              ))}
            </List>
          </Grid>
        </Grid>
      </>
    </Drawer>
  );
};

export default VariableDrawer;
