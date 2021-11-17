import { Icon } from "@mui/material";
import { ReactComponent as Logo } from "./network.svg";

interface NetworkIconProps{
  size?: string;
  fill?: string;
}

const NetworkIcon = ({size = '24px', fill='white'}: NetworkIconProps) => {
  return (
    <Icon sx={{ height: "auto", width: "auto", my: 0, py: 0, fill: "white" }}>
      <Logo style={{ height: "100%", width: size, fill: fill }} />
    </Icon>
  );
};

export const createNetworkIcon = (size: string = '24px', fill: string = 'white') => {
  return <NetworkIcon size={size} fill={fill} />;
}

export default NetworkIcon;
