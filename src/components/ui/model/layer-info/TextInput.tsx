// MUI
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import React from "react";
import { Ref } from "react";

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/
interface Props<T extends string | number> {
  children?: React.ReactNode;
  name: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);
  helperText?: string;
  number?: boolean;
  onFocus?: React.FocusEventHandler;
}

const TextInput = React.forwardRef(
  <T extends number | string>(props: Props<T>, ref: Ref<HTMLInputElement>) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (props.number) {
        if (isNaN(parseInt(event.target.value))) {
          props.setValue(0 as T);
        } else {
          props.setValue(parseInt(event.target.value) as T);
        }
      } else {
        props.setValue(event.target.value as T);
      }
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
          <TextField
            inputRef={ref}
            inputProps={{ pattern: props.number ? "[0-9]*" : "[sS]*" }}
            variant="standard"
            margin="none"
            onChange={handleChange}
            value={props.value}
            fullWidth
            onFocus={props.onFocus}
          />
        </Grid>
      </Grid>
    );
  }
);

export default TextInput as <T extends number | string>(
  props: Props<T> & { ref: Ref<HTMLInputElement> }
) => JSX.Element;
