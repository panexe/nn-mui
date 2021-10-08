import { FormControlLabel, Checkbox } from "@mui/material";


interface Props{
    children? : React.ReactNode[];
    name: string;
    value: boolean, 
    setValue: React.Dispatch<React.SetStateAction<boolean>>,
}

const CheckBoxInput = (props: Props) => {

    const onChangeHandler = (event: React.SyntheticEvent<Element, Event>, checked: boolean) => {
        props.setValue(checked);
    }
    return <FormControlLabel
    sx={{marginLeft:0}}
        value="top"
        control={<Checkbox />}
        label={props.name}
        labelPlacement="start"
        checked={props.value}
        onChange={onChangeHandler}
    />
}

export default CheckBoxInput;