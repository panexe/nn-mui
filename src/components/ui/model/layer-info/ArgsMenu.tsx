import {
  Alert,
  Checkbox,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  PaperProps,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { OptionTypes } from "../../../../types";
import { ACTIVATIONS, CONSTRAINTS, INITIALIZERS, NodeLayerArgs, REGULARIZERS } from "../nn-elements";
import CheckBoxInput from "./CheckBoxInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

const StyledPaper = styled((props: PaperProps) => <Paper {...props} />)(
  ({ theme }) => ({
    borderRadius: 0,
    paddingLeft: "8px",
    paddingRight: "0px",
    backgroundColor: theme.palette.background.default,
  })
);

interface Props<T> {
  menu: { option: string; type: OptionTypes }[];
  args: T;
  setArgs: React.Dispatch<React.SetStateAction<T>>;
  name: string;
}

const ArgsMenu = <T extends Object>(props: Props<T>) => {
  const [selectState, setSelectState] = useState("hello");
  const [textState, setTextState] = useState<string | number>("text");
  const [numberState, setNumberState] = useState<string | number>(0);
  const [check, setCheck] = useState(false);

  const getSetArg = (arg: string) => {
    return (val: any) => {
      props.setArgs((old) => {
        return { ...old, [arg]: val };
      });
      console.log(arg, val);
    };
  };

  const options = props.menu.map((opt) => {
    switch (opt.type) {
      case OptionTypes.category:
        return (
          <Typography
            key={`${props.name}-option-category-${opt.option}`}
            variant="h4"
            mt={2}
          >
            {opt.option}
          </Typography>
        );
      case OptionTypes.number:
        return (
          <React.Fragment key={`option-fragment-${opt.option}`}>
            <TextInput
              number
              value={(props.args as any)[opt.option]}
              setValue={getSetArg(opt.option)}
              name={opt.option}
              id={`${props.name}number-option-${opt.option}`}
              key={`${props.name}key-number-option-${opt.option}`}
            />
            <Divider key={`${props.name}div-under-option-${opt.option}`} />
          </React.Fragment>
        );
      case OptionTypes.text:
        return (
          <React.Fragment key={`option-fragment-${opt.option}`}>
            <TextInput
              key={`${props.name}key-text-option-${opt.option}`}
              value={(props.args as any)[opt.option]}
              setValue={getSetArg(opt.option)}
              name={opt.option}
              id={`${props.name}text-option-${opt.option}`}
            />
            <Divider key={`${props.name}div-under-option-${opt.option}`} />
          </React.Fragment>
        );
      case OptionTypes.boolean:
        return (
          <React.Fragment key={`option-fragment-${opt.option}`}>
            <CheckBoxInput
              key={`${props.name}checkbox-option-${opt.option}`}
              name={opt.option}
              value={(props.args as any)[opt.option]}
              setValue={getSetArg(opt.option)}
            />
            <Divider key={`${props.name}div-under-option-${opt.option}`} />
          </React.Fragment>
        );

      case OptionTypes.activation:
        return (
          <React.Fragment key={`option-fragment-${opt.option}`}>
            <SelectInput
              value={(props.args as any)[opt.option]}
              setValue={getSetArg(opt.option)}
              name={opt.option}
              key={`${props.name}key-activation-option-${opt.option}`}
              id={`${props.name}activation-option-${opt.option}`}
              options={Object.keys(ACTIVATIONS)}
            />
            <Divider key={`${props.name}div-under-option-${opt.option}`} />
          </React.Fragment>
        );
      case OptionTypes.constraint:
        return (
          <React.Fragment key={`option-fragment-${opt.option}`}>
            <SelectInput
              value={(props.args as any)[opt.option]}
              setValue={getSetArg(opt.option)}
              name={opt.option}
              key={`${props.name}key-constraint-option-${opt.option}`}
              id={`${props.name}constraint-option-${opt.option}`}
              options={Object.keys(CONSTRAINTS)}
            />
            <Divider key={`${props.name}div-under-option-${opt.option}`} />
          </React.Fragment>
        );
      case OptionTypes.regularizer:
        return (
          <React.Fragment key={`option-fragment-${opt.option}`}>
            <SelectInput
              value={(props.args as any)[opt.option]}
              setValue={getSetArg(opt.option)}
              name={opt.option}
              key={`${props.name}key-regularizer-option-${opt.option}`}
              id={`${props.name}regularizer-option-${opt.option}`}
              options={Object.keys(REGULARIZERS)}
            />
            <Divider key={`${props.name}div-under-option-${opt.option}`} />
          </React.Fragment>
        );
      case OptionTypes.initializer:
        return (
          <React.Fragment key={`option-fragment-${opt.option}`}>
            <SelectInput
              value={(props.args as any)[opt.option]}
              setValue={getSetArg(opt.option)}
              name={opt.option}
              key={`${props.name}key-initializer-option-${opt.option}`}
              id={`${props.name}initializer-option-${opt.option}`}
              options={Object.keys(INITIALIZERS)}
            />
            <Divider key={`${props.name}div-under-option-${opt.option}`} />
          </React.Fragment>
        );
      default:
        return (
          <Alert
            key={`${props.name}option-error-${opt.option}`}
            severity="error"
          >
            Option {opt.option} not found!
          </Alert>
        );
    }
  });

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={0}
      sx={{ margin: "1em", fontSize: "24px" }}
    >
      {options}
    </Stack>
  );
};

export default ArgsMenu;