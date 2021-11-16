import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DatasetIcon from "../../../icons/DatasetIcon/DatasetIcon";
import { ReactNode, useState } from "react";
import TextInput from "./TextInput";

interface ArgumentFloatCategoryProps {
  children?: ReactNode;
  name: string;
}

const ArgumentFloatCategory = ({
  children,
  name,
}: ArgumentFloatCategoryProps) => {
  const theme = useTheme();
  const [text, setText] = useState<string>("text");
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpanded = () => {
    setExpanded((old) => !old);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={toggleExpanded}
      sx={{
        boxShadow: "none",
        border: "none",
        m: 0,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <AccordionSummary
        sx={{ px: 0, backgroundColor: "background.paper" }}
        expandIcon={<ExpandMoreIcon />}
      >
        {name}
      </AccordionSummary>

      <AccordionDetails sx={{ px: 0, backgroundColor: "background.paper" }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default ArgumentFloatCategory;
