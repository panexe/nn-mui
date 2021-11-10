// REACT
import React, { ReactNode, useState } from "react";

// MUI
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SaveIcon from '@mui/icons-material/Save';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Divider, ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/system";

// UNFINISHED

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/

const StyledDiv = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
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


/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

interface ToolSelectBarProps{
  children?: ReactNode; 
  onSave: () => void;
  onRestore: () => void;
};

const ToolSelectBar = (props: ToolSelectBarProps) => {
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
        <ToggleButton onClick={props.onSave} value="val1">
          <SaveIcon />
        </ToggleButton>

        <ToggleButton onClick={props.onRestore} value="val2">
          <RestorePageIcon />
        </ToggleButton>

        <ToggleButton value="val3">
          <CheckBoxOutlineBlankIcon />
        </ToggleButton>

        <ToggleButton value="val4">
          <ControlPointIcon />
        </ToggleButton>
      </StyledToggleButtonGroup>
      <Divider />
    </StyledDiv>
  );
};

export default ToolSelectBar;
