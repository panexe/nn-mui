import { Icon} from "@mui/material";
import { ReactComponent as Logo } from "./expand.svg";

interface ExpandIconProps{
  size?: string; 
  fill?: string;
}

const ExpandIcon = ({size = '24px', fill='white'}: ExpandIconProps) => {
  return (
    <Icon sx={{ height: "auto", width: "auto", my: 0, py: 0, fill: "white" }}>
      <Logo style={{ height: "100%", width: size, fill: fill }} />
    </Icon>
  );
};

export const createExpandIcon = (size: string = '24px', fill: string = 'white') => {
  return <ExpandIcon size={size} fill={fill} />;
}

export default ExpandIcon;
