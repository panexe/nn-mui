import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { uiActions } from "../../../store/ui";

interface DrawerItemProps {
  icon: (size?: string, fill?: string) => JSX.Element;
  name: string;
  open: boolean;
  tabIndex: number;
}

const DrawerItem = ({ icon, name, open, tabIndex }: DrawerItemProps) => {
    const dispatch = useAppDispatch();
    const currentTabIndex = useSelector<RootState>((state) => state.ui.tabIndex);
    const theme = useTheme();

    const selected = currentTabIndex === tabIndex;
    const color = selected ? theme.palette.primary.main : 'white';

    const handleClick = () => {
        dispatch(uiActions.setTab(tabIndex));
    }


  if (open) {
    return (
      <ListItem button onClick={handleClick} key={name} sx={{ width: "100%" }}>
        <ListItemIcon > {icon('24px', color) }</ListItemIcon>
        <ListItemText sx={{color: color}} primary={name} />
      </ListItem>
    );
  } else {
    return (
      <ListItem
        button
        key={name}
        sx={{ minWidth: "72px", minHeight: "72px", maxHeight: "72px", px: 0 }}
        onClick={handleClick}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            paddingBottom: "16px",
            paddingTop: "14px",
            px: 0,
          }}
        >
          <Grid item >{icon('24px', color)}</Grid>
          <Grid item>
            <Typography color={color} fontWeight="bold" fontSize="11pt">
              {name}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
};

export default DrawerItem;
