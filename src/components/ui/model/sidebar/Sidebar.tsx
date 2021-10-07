import SidebarCategory from "./SidebarCategory";
import {  MenuItem, MenuList } from "@mui/material";
import {  styled } from "@mui/system";

const StyledDiv = styled("div")(({ theme }) => ({
  color: theme.palette.background.paper,
  backgroundColor: theme.palette.action.hover,
  padding: theme.spacing(0),
  height: "100%",
}));

const Sidebar = () => {
  return (
    <StyledDiv>
      <SidebarCategory title={"Layers"}>
        <MenuList>
          <MenuItem draggable>Item 1</MenuItem>

          <MenuItem draggable>Item 2</MenuItem>

          <MenuItem draggable>Item 3</MenuItem>
        </MenuList>
      </SidebarCategory>
      <SidebarCategory title={"math"}>
      <MenuList>
          <MenuItem draggable>Item 1</MenuItem>

          <MenuItem draggable>Item 2</MenuItem>

          <MenuItem draggable>Item 3</MenuItem>
        </MenuList>
      </SidebarCategory>
      <SidebarCategory title={"Losses"}>
      <MenuList>
          <MenuItem draggable>Item 1</MenuItem>

          <MenuItem draggable>Item 2</MenuItem>

          <MenuItem draggable>Item 3</MenuItem>
        </MenuList>
      </SidebarCategory>
    </StyledDiv>
  );
};
export default Sidebar;
