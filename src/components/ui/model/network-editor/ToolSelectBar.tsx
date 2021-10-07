import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {  ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.divider,
  width: "100%",
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const StyledToogleButton = styled(ToggleButton)(({ theme }) => ({
    "& .MuiToggleButton-root": {
        backgroundColor: 'pink',
      "& .Mui-selected": {
        backgroundColor: 'pink',
      },
    },
  }));

const ToolSelectBar = () => {
  const [value, setValue] = useState<string | null>("val1");

  const handleValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setValue(newValue);
  };

  return (
    <StyledDiv>
      <StyledToggleButtonGroup value={value} exclusive onChange={handleValue}>
        <ToggleButton value="val1">
          <CheckBoxOutlineBlankIcon />
        </ToggleButton>

        <ToggleButton value="val2">
          <ControlPointIcon />
        </ToggleButton>

        <ToggleButton value="val3">
          <CheckBoxOutlineBlankIcon />
        </ToggleButton>

        <ToggleButton value="val4">
          <ControlPointIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
    </StyledDiv>
  );
};

export default ToolSelectBar;
