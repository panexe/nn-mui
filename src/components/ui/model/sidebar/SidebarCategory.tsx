// REACT
import React, { useState } from "react";
// MUI
import {Accordion} from "@mui/material";
import {AccordionProps} from "@mui/material";
import {AccordionSummary} from "@mui/material";
import {AccordionSummaryProps} from "@mui/material";
import {AccordionDetails} from "@mui/material";
import {Typography} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/material/Icon";
import { styled } from "@mui/system";
import theme from "../../../../theme";

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/

/**
 * Styled Version of Accordion MUI component
 */
const StyledAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRight: '0px',
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

/**
 * Styled Version of AccordionSummary MUI component
 * The text that is displayed when the accordion is closed
 */
const StyledAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

/**
 * Styled Version of AccordionSummary MUI component
 * The text that is displayed when the accordion is closed
 */
const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    backgroundColor: theme.palette.action.hover,
  padding: theme.spacing(0),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

/*--------------------------------------------------------*/
/*                       COMPONENT                        */
/*--------------------------------------------------------*/

interface Props{
    children?: React.ReactNode;
    title: string;
}
const SidebarCategory = (props: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledAccordion expanded={expanded} onChange={handleChange}>
      <StyledAccordionSummary style={{backgroundColor: expanded? theme.palette.action.disabledBackground : theme.palette.action.hover}}>
        <Typography>{props.title}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        {props.children}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default SidebarCategory;
