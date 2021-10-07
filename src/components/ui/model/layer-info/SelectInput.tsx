import { styled } from "@mui/system";
import {
  Select,
  SelectProps,
  Box,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  MenuItem,
  Grid,
} from "@mui/material";
import { useState } from "react";

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

interface Props {
  children?: React.ReactNode;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  options: string[];

}

const SelectInput = (props: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      {false && '<FormControl fullWidth size="small">'}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <InputLabel id={`inputLabel-${props.id}`}>{props.name}</InputLabel>
        </Grid>
        <Grid item >
          <StyledSelect
            labelId={`inputLabel-${props.id}`}
            size="small"
            fullWidth
            id={props.id}
            label={props.name}
            onChange={handleChange}
            value={props.value}
          >
            {props.options.map((val) => {
              return <MenuItem key={`select-${props.id}-${val}`} value={val}>{val}</MenuItem>;
            })}
          </StyledSelect>
        </Grid>
      </Grid>
      {false && "(</FormControl>)"}
    </Box>
  );
};

export default SelectInput;
