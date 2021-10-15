// MUI
import { FormControlLabel, Grid, InputLabel } from "@mui/material";
import { Checkbox } from "@mui/material";

/**
 * Props that are passed to this component
 */
interface Props {
  children?: React.ReactNode[];
  name: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Basic checkbox input for use in the Sidebar
 *
 * - This component must be controlled.
 * @param props name: shown on label, value/setValue state controll
 * @returns JSX.Element
 */
const CheckBoxInput = (props: Props) => {
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setValue(event.target.checked);
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={5}>
        <InputLabel>{props.name}</InputLabel>
      </Grid>
      <Grid item xs={7}>
        <Checkbox checked={props.value} onChange={onChangeHandler} sx={{ float: "right" }} />
      </Grid>
    </Grid>
  );
};

export default CheckBoxInput;
