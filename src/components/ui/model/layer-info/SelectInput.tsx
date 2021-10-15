// MUI
import { styled } from "@mui/system";
import { Select } from "@mui/material";
import { SelectProps } from "@mui/material";
import { Box } from "@mui/material";
import { InputLabel } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";

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
  setValue: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  options: string[];
}

const SelectInput = (props: Props) => {
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
        <Select margin="none" value={props.value} fullWidth variant="standard" onChange={handleChange}>
          {props.options.map((val) => {
            return (
              <MenuItem
                id={`select-option-${props.id}-${val}`}
                key={`select-option-${props.id}-${val}`}
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
};

export default SelectInput;
