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
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SidebarFloatCategory from "./SidebarFloatCategory";
import { Box, SxProps } from "@mui/system";

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
    backgroundColor: "green",
    color: theme.palette.text.primary,
  },
}));

interface SidebarFloatProps {
  style: any
}

const SidebarFloat = ({ style }: SidebarFloatProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleOpen = () => {
    setExpanded(!expanded);
  };
  const theme = useTheme();

  return (
    <div style={{...style, width:'280px', marginRight:0}}>
      <Paper
        sx={{
          mx:0,
          width:expanded? '280px' : 'fit-content',
          
          borderRadius: "4px",
          border: "solid 1px white",
        }}
      >
        <Accordion expanded={expanded} onChange={toggleOpen} sx={{ backgroundColor: theme.palette.background.paper }}>
          <StyledAccordionSummary
            sx={{
              paddingLeft: "24px",
              paddingRight: "16px",
              marginBottom: "0px",
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography fontSize="21px">NODES</Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            ></Grid>
          </StyledAccordionSummary>
          <AccordionDetails sx={{ paddingLeft: "24px" }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={exampleValues}
              sx={{ width: "100%" }}
              size="small"
              renderInput={(params) => (
                <TextField margin="dense" {...params} label="Node Type" />
              )}
            />
            <SidebarFloatCategory />
            <SidebarFloatCategory />
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
};

export default SidebarFloat;
