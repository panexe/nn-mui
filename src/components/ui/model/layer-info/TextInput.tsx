// MUI
import { TextField } from "@mui/material";
import { FilledTextFieldProps } from "@mui/material";
import { Grid } from "@mui/material";
import { InputLabel } from "@mui/material";
import { styled } from "@mui/system";
import React, { Ref, useEffect } from "react";

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/
interface Props {
  children?: React.ReactNode;
  name: string;
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  helperText?: string;
  number?: boolean;
  onFocus? : React.FocusEventHandler,
}

const TextInput = React.forwardRef<HTMLInputElement, Props> ((props, ref) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.number) {
      if( isNaN(parseInt(event.target.value))){
        props.setValue(0);
      }else{
        props.setValue(parseInt(event.target.value));
      }
      
    } else {
      props.setValue(event.target.value);
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
          inputProps={{ pattern: props.number ? "[0-9]*" : "[\s\S]*" }}
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
});

export default TextInput;
