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
const SidebarFloatCategory = () => {
  const theme = useTheme();

  return (
    <Accordion sx={{ boxShadow: "none", border: "none", m: 0 , backgroundColor:theme.palette.background.paper}}>
      <AccordionSummary sx={{ px: 0 }} expandIcon={<ExpandMoreIcon />}>
        basic
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0 }}>
      <ListItem draggable button  sx={{ width: "100%", padding: '0', fontWeight:'bold' }}>
        <ListItemIcon><DatasetIcon /></ListItemIcon>
        <ListItemText  primary={'Dense'} />
      </ListItem>
      </AccordionDetails>
    </Accordion>
  );
};

export default SidebarFloatCategory;
