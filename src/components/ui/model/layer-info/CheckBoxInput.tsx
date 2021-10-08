// MUI
import { FormControlLabel } from "@mui/material";
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
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    props.setValue(checked);
  };
  return (
    <FormControlLabel
      sx={{ marginLeft: 0 }}
      value="top"
      control={<Checkbox />}
      label={props.name}
      labelPlacement="start"
      checked={props.value}
      onChange={onChangeHandler}
    />
  );
};

export default CheckBoxInput;
