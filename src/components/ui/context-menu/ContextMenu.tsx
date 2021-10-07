import { Menu, MenuItem, Box } from "@mui/material";
import React from "react";
import { useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const ContextMenu = (props: Props) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <div onContextMenu={handleContextMenu} style={{cursor: 'context-menu', height: '100%'}}>
      <Box sx={{height: '100%'}}>{props.children}</Box>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference={"anchorPosition"}
        anchorPosition={contextMenu !== null ? {top: contextMenu.mouseY, left: contextMenu.mouseX} : undefined}
      >
        <MenuItem onClick={handleClose}>item 1</MenuItem>
        <MenuItem onClick={handleClose}>item 2</MenuItem>
        <MenuItem onClick={handleClose}>item 3</MenuItem>
        <MenuItem onClick={handleClose}>item 4</MenuItem>
      </Menu>
    </div>
  );
};

export default ContextMenu;
