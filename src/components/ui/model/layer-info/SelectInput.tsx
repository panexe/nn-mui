// MUI
import { styled } from "@mui/system";
import { Select } from "@mui/material";
import { SelectProps } from "@mui/material";
import { Box } from "@mui/material";
import { InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import React, { Ref } from "react";

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/
const StyledSelect = styled((props: SelectProps<string>) => (
  <Select {...props} />
))(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.action.disabledBackground,
  borderRadius: 0,
  fontSize: "18px",

  "& label.Mui-focused": {
    color: "pink",
  },

  "& .MuiFilledInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary,
    },
  },
}));

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/
interface Props {
  children?: React.ReactNode;
  name: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  onFocus: React.FocusEventHandler;
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
            ref={ref}
            margin="none"
            value={props.value}
            fullWidth
            variant="standard"
            onChange={handleChange}
            onFocus={props.onFocus}
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
