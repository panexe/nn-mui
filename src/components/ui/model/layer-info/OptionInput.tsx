import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled((props: TextFieldProps) =>(
    <TextField InputProps={{disableUnderline: true}}  {...props}/> ))(({theme}) => ({
      margin: theme.spacing(1),
    
    '& label.Mui-focused': {
      color: theme.palette.text.primary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  }));

const OptionInput = () => {

}

export default OptionInput;