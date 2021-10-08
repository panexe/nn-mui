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
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>,
  id: string;
  helperText?: string;
  number?: boolean;
}

const TextInput = (props: Props) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        if(props.number){
            props.setValue(parseInt(event.target.value));
        }else{
            props.setValue(event.target.value);
        }
        
    }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
      <Grid item>
        <InputLabel sx={{fontSize:'18px'}}>{props.name}:</InputLabel>
      </Grid>
      <Grid item xs={8}>
        <StyledTextField
          type={props.number ? 'number' : ''}
          fullWidth={true}
          hiddenLabel
          id={props.id}
          InputLabelProps={{ shrink: true }}
          helperText={props.helperText ? props.helperText : ""}
          variant="filled"
          onChange={handleChange}
          value={props.value}
        ></StyledTextField>
      </Grid>
    </Grid>
  );
};

export default TextInput;
