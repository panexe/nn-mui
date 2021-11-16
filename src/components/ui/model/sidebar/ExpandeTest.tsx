import {
  Collapse,
  Grow,
  IconButton,
  Paper,
  Switch,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandIcon from "../../../icons/ExpandIcon/ExpandIcon";
import SettingsIcon from "../../../icons/SettingsIcon/SettingsIcon";

interface ExpandTestProps {
  transitionProps?: Object;
}

const ExpandTest = ({ transitionProps }: ExpandTestProps) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedVert, setExpandedVert] = useState(false);

  const toggleExpanded = () => {
    setExpanded((old) => !old);
  };

  return (
    <Paper
      sx={{
        top: "40%",
        transform: "translate(0, -50%)",
        left: "24px",
        position: "relative",
        zIndex: 5,
        border: "solid 1px",
        width: "fit-content",
        maxWidth: "280px",
      }}
    >
      {!expanded && (
        <IconButton onClick={toggleExpanded}>
          <ExpandIcon />
        </IconButton>
      )}
      {expanded && (
        <>
          <Typography>Title</Typography>
          <IconButton onClick={toggleExpanded}>
            <ExpandIcon />
          </IconButton>
        </>
      )}
      <Grow
        in={expanded}
        style={{ transformOrigin: "0 0 0" }}
        {...(expanded ? { timeout: 1000 } : {})}
      >
        <div role="region">
          <Typography>Lorem Ipsum dolore </Typography>
          <SettingsIcon />
        </div>
      </Grow>
      {false && <Typography>Test test</Typography>}
    </Paper>
  );
};

export default ExpandTest;
