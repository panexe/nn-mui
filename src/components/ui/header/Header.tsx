import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import { useContext } from "react";
import AppContext from "../../../context/app-context";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  padding: 0,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  padding: theme.spacing(0),
  margin: theme.spacing(0),
  height: "100%",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.action.disabledBackground,
  padding: theme.spacing(0),
  borderRight: "solid 1px",
  borderLeft: "solid 1px",
  paddingLeft: "0px",
  borderColor: theme.palette.divider,
  fontSize: '18px',
  height: "100%",
  '&.Mui-selected': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(0),
  minHeight: "0",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(0),
}));

const Header = () => {
  const appContext = useContext(AppContext);

  function tabProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    appContext.setTabIndex(newValue);
  };

  const tabs = [
    { name: "Dataset", index: 0 },
    { name: "Model", index: 1 },
    { name: "Train", index: 2 },
    { name: "Eval", index: 3 },
  ];

  return (
    <>
      <StyledAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <StyledToolbar disableGutters>
          <StyledGrid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item xs={2}>
              <Typography variant="h3">nn-ui</Typography>
            </Grid>
            <Grid item xs={8}>
              <StyledTabs variant="fullWidth" onChange={handleChange} value={appContext.tabIndex}>
                {tabs.map( tab => <StyledTab disableRipple={true} label={tab.name} key={tab.index} {...tabProps(tab.index)}   /> )}
              </StyledTabs>
            </Grid>
          </StyledGrid>
        </StyledToolbar>
      </StyledAppBar>
    </>
  );
};

export default Header;
