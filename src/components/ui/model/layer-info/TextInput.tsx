import {
  TextField,
  FilledTextFieldProps,
  Theme,
  FormControl,
  FormLabel,
  OutlinedInput,
  Grid,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { yellow } from "@mui/material/colors";
import { createStyles, makeStyles } from "@mui/styles";

const inputStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[200],
      transition: "0.3s",
    },
    focused: {
      backgroundColor: theme.palette.common.white,
      boxShadow: `0 0 0 2px ${yellow[700]}`,
    },
    error: {
      backgroundColor: "#fff0f0",
      "&$focused": {
        boxShadow: `0 0 0 2px ${"#ff6b81"}`,
      },
    },
    disabled: {
      backgroundColor: theme.palette.grey[50],
    },
    input: {
      padding: "1rem",
    },
  })
);

const StyledTextField = styled((props: FilledTextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true }}
    InputLabelProps={{ shrink: true }}
    margin={"dense"}
    size="small"
    fullWidth={true}
    {...props}
  />
))(({ theme }) => ({
  color: theme.palette.action.hover,

  "& .MuiFilledInput-input": {
    "&:focus": {
      outline: 1,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },

  "& .MuiFilledInput-root": {
    border: `0px solid ${theme.palette.action.hover}`,
    overflow: "hidden",
    borderRadius: 0,
    backgroundColor: theme.palette.action.hover,
  },

  "&.Mui-focused": {
    border: `1px solid ${theme.palette.primary.main}`,
    borderColor: theme.palette.primary.main,
  },
}));

interface Props {
  children?: React.ReactNode;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>,
  id: string;
  helperText?: string;
}

const TextInput = (props: Props) => {
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
      <Grid item>
        <InputLabel sx={{fontSize:'18px'}}>{props.name}:</InputLabel>
      </Grid>
      <Grid item xs={8}>
        <StyledTextField
          fullWidth={true}
          hiddenLabel
          id={props.id}
          InputLabelProps={{ shrink: true }}
          helperText={props.helperText ? props.helperText : ""}
          variant="filled"
        ></StyledTextField>
      </Grid>
    </Grid>
  );
};

export default TextInput;
