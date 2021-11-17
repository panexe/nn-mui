import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";
import { DragEvent } from "react";
import LayersIcon from "../../../icons/LayersIcon/LayersIcon";

interface SidebarFloatCategoryProps {
  children?: ReactNode;
  name: string;
  items: string[];
}

const SidebarFloatCategory = ({ name, items }: SidebarFloatCategoryProps) => {
  const theme = useTheme();

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
    console.log("dragstart: ", nodeType);
  };

  return (
    <Accordion
      sx={{
        boxShadow: "none",
        border: "none",
        m: 0,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <AccordionSummary
        sx={{ px: 0, backgroundColor: theme.palette.background.paper }}
        expandIcon={<ExpandMoreIcon />}
      >
        {name}
      </AccordionSummary>
      <AccordionDetails
        sx={{ px: 0, backgroundColor: theme.palette.background.paper }}
      >
        {items.map((item) => (
          <ListItem
            draggable
            button
            onDragStart={(event: DragEvent) => onDragStart(event, item)}
            key={`sidebar-float-item-${item}`}
            sx={{ width: "100%", padding: "0", fontWeight: "bold" }}
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default SidebarFloatCategory;
