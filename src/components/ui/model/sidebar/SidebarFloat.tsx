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
  Theme,
  Tooltip,
  Collapse,
  Grow,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SidebarFloatCategory from "./SidebarFloatCategory";
import { Box, SxProps } from "@mui/system";
import ExpandIcon from "../../../icons/ExpandIcon/ExpandIcon";
import { nodesMenu } from "../nn-elements/layers";
import { TensorflowAdapter } from "../../../../adapters/INNLib";

const exampleValues = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
];

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
    <div style={{ ...style, width: expanded ? "280px" : "fit-content", marginRight: 0 }}>
      <Paper
        sx={{
          mx: 0,
          width: expanded ? "280px" : "fit-content",
          borderRadius: "4px",
          border: "solid 1px white",
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
              }}
              expandIcon={expanded ? <ExpandMoreIcon /> : <ExpandIcon />}
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
