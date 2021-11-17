import {
  Paper,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Autocomplete,
  styled,
  useTheme,
  Tooltip,
} from "@mui/material";

import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SidebarFloatCategory from "./SidebarFloatCategory";
import ExpandIcon, {
  createExpandIcon,
} from "../../../icons/ExpandIcon/ExpandIcon";
import { nodesMenu } from "../nn-elements/layers";
import { TensorflowAdapter } from "../../../../adapters/INNLib";

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "&.MuiAccordionSummary-content": {
    margin: 0,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

interface SidebarFloatProps {
  style: any;
}

const SidebarFloat = ({ style }: SidebarFloatProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const toggleOpen = () => {
    setExpanded(!expanded);
  };
  const theme = useTheme();
  const allNodeNames = nodesMenu(new TensorflowAdapter()).reduce(
    (prev, cur) => {
      return {
        categoryName: cur.categoryName,
        layers: prev.layers.concat(cur.layers),
      };
    }
  ).layers;

  return (
    <div
      style={{
        ...style,
        width: expanded ? "280px" : "fit-content",
        marginRight: 0,
      }}
    >
      <Paper
        sx={{
          mx: 0,
          width: expanded ? "280px" : "fit-content",
          borderRadius: "4px",
          padding: "0px",
          border: `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Accordion
          expanded={expanded}
          onChange={toggleOpen}
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <Tooltip
            title="Add nodes"
            placement="top"
            sx={{ backgroundColor: "green" }}
          >
            <StyledAccordionSummary
              sx={{
                paddingLeft: expanded ? "24px" : "16px",
                paddingRight: "16px",
                marginBottom: "0px",
                backgroundColor: theme.palette.background.paper,
                ":hover": {
                  backgroundColor: expanded
                    ? theme.palette.background.paper
                    : theme.palette.primary.main,
                },
                borderRadius: '4px',
              }}
              expandIcon={
                expanded ? (
                  <ExpandMoreIcon sx={{ fill: theme.palette.text.primary }} />
                ) : (
                  createExpandIcon("24px", theme.palette.text.primary)
                )
              }
            >
              <Typography fontSize="21px">{expanded ? "NODES" : ""}</Typography>

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              ></Grid>
            </StyledAccordionSummary>
          </Tooltip>
          <AccordionDetails
            sx={{
              paddingLeft: "24px",
              visibility: expanded ? "visible" : "collapse",
              width: expanded ? "auto" : "24px",
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allNodeNames}
              sx={{ width: "100%" }}
              size="small"
              renderInput={(params) => (
                <TextField margin="dense" {...params} label="Node Type" />
              )}
            />
            {nodesMenu(new TensorflowAdapter()).map((cat, index) => (
              <SidebarFloatCategory
                key={`sidebar-float-category-${cat}-${index}`}
                name={cat.categoryName}
                items={cat.layers}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
};

export default SidebarFloat;
