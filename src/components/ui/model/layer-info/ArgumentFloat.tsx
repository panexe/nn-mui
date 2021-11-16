import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextInput from "./TextInput";
import ArgumentFloatCategory from "./ArgumentFloatCategory";
import { Portals } from "../../../../types";

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "&.MuiAccordionSummary-content": {
    margin: 0,
    backgroundColor: "green",
    color: theme.palette.text.primary,
  },
}));

interface ArgumentFloatProps {
  style: any;
  children?: React.ReactNode;
}

const ArgumentFloat = ({ style }: ArgumentFloatProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleOpen = () => {
    setExpanded(!expanded);
  };
  const theme = useTheme();

  return (
    <div style={{ ...style, width: "280px", marginRight: 0 }}>
      <Paper
        sx={{
          mx: 0,
          width: expanded ? "280px" : "fit-content",
          float: "right",
          borderRadius: "4px",
          border: "solid 1px white",
        }}
      >
        <Accordion
          expanded={expanded}
          onChange={toggleOpen}
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <StyledAccordionSummary
            sx={{
              paddingLeft: "24px",
              paddingRight: "16px",
              marginBottom: "0px",
              backgroundColor: "background.paper",
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography fontSize="21px">ARGS</Typography>
          </StyledAccordionSummary>
          <AccordionDetails
            sx={{
              paddingLeft: "24px",
              width: expanded ? "auto" : "24px",
              visibility: expanded ? "visible" : "collapse",
              backgroundColor: "background.paper",
            }}
          >
            <div style={{backgroundColor: theme.palette.background.paper}} id={Portals.layerInfo}></div>
            
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
};

export default ArgumentFloat;
