// MUI
import { Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import React, { Ref } from "react";

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/
interface Props {
  children?: React.ReactNode;
  name: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  open?: boolean;
  onOpen?: (event: React.SyntheticEvent<Element, Event>) => void;
  onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
}

const SelectInput = React.forwardRef(
  (props: Props, ref: Ref<HTMLInputElement>) => {
    const handleChange = (event: SelectChangeEvent) => {
      props.setValue(event.target.value);
    };

    return (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={5}>
          <InputLabel>{props.name}</InputLabel>
        </Grid>
        <Grid item xs={7}>
          <Select
            inputRef={ref}
            margin="none"
            value={props.value}
            fullWidth
            variant="standard"
            onChange={handleChange}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            open={props.open}
            onOpen={props.onOpen}
            onClose={props.onClose}
          >
            {props.options.map((val) => {
              return (
                <MenuItem
                  id={`select-option-${props.name}-${val}`}
                  key={`select-option-${props.name}-${val}`}
                  value={val}
                >
                  {val}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
    );
  }
);

export default SelectInput;
