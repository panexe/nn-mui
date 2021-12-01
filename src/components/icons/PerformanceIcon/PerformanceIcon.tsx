import { Icon } from "@mui/material";
import { ReactComponent as Logo } from "./performance.svg";

interface PerformanceIconProps{
  size?: string;
  fill?: string;
}

const PerformanceIcon = ({size = '24px', fill='white'}: PerformanceIconProps) => {
  return (
    <Icon sx={{ height: "auto", width: "auto", my: 0, py: 0, fill: fill }}>
      <Logo style={{ height: "100%", width: size, fill: fill }} />
    </Icon>
  );
};

export const createPerformanceIcon = (size: string = '24px', fill: string = 'white') => {
  return <PerformanceIcon size={size} fill={fill} />;
}

export default PerformanceIcon;
