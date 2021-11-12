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
  values: ReactNode[];
}

const ArgumentFloatCategory = ({
  children,
  values,
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
      <AccordionSummary sx={{ px: 0, backgroundColor: 'background.paper' }} expandIcon={<ExpandMoreIcon />}>
        basic
      </AccordionSummary>

      <AccordionDetails sx={{ px: 0, backgroundColor: 'background.paper' }}>
        <ListItem sx={{ width: "100%", padding: "0", fontWeight: "bold" }}>
          <TextInput
            value={text}
            ref={null}
            setValue={setText}
            name="testing"
          />
        </ListItem>
      </AccordionDetails>
    </Accordion>
  );
};

export default ArgumentFloatCategory;
