import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { uiActions } from "../../../store/ui";

const Settings = () => {
  const dispatch = useAppDispatch();
  const colorMode = useSelector<RootState>((state) => state.ui.colorMode);

  const handleSwitchChange = () => {
    dispatch(uiActions.toggleColorMode());
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch value={colorMode === "light"} onChange={handleSwitchChange} />
        }
        label="Color Mode"
      />
    </FormGroup>
  );
};

export default Settings;
