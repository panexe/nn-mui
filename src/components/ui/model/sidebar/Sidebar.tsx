import SidebarCategory from "./SidebarCategory";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { nodesMenu } from "../nn-elements/layers";
import { DragEvent } from "react";

/*--------------------------------------------------------*/
/*                         CSS                            */
/*--------------------------------------------------------*/

const StyledDiv = styled("div")(({ theme }) => ({
  color: theme.palette.background.paper,
  backgroundColor: theme.palette.action.hover,
  padding: theme.spacing(0),
  height: "100%",
}));

const Sidebar = () => {

  const onDragStart = (event : DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    console.log('dragstart: ',nodeType);
  }


  const objs = Object.entries(nodesMenu).map(([cat, vals]) => {
    return (
      <SidebarCategory key={cat} title={cat}>
        {vals.map((val) => {
          return (
            <MenuItem draggable onDragStart={(event: DragEvent) => onDragStart(event, val)} key={cat + val}>
              <div >{val}</div>
            </MenuItem>
          );
        })}
      </SidebarCategory>
    );
  });
  console.log("objs in sidebar: ", objs);

  return <StyledDiv>{objs}</StyledDiv>;
};
export default Sidebar;
