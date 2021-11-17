import { Icon } from "@mui/material";
import { ReactComponent as Logo } from "./layers.svg";

interface LayersIconProps{
  size?: string; 
  fill?: string;
}

const LayersIcon = ({size = '24px', fill='white'}: LayersIconProps) => {
  return (
    <Icon sx={{ height: "auto", width: "auto", my: 0, py: 0, fill: "white" }}>
      <Logo fill={fill} height="auto" width={size} />
    </Icon>
  );
};

export const createLayersIcon = (size: string = '24px', fill: string = 'white') => {
  return <LayersIcon size={size} fill={fill} />;
}

export default LayersIcon;
