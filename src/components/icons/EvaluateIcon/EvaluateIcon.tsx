import { Icon } from "@mui/material";
import { ReactComponent as Logo } from "./evaluate.svg";

interface EvaluateIconProps{
  size?: string; 
  fill?: string;
}

const EvaluateIcon = ({size = '24px', fill='white'}: EvaluateIconProps) => {
  return (
    <Icon sx={{ height: "auto", width: "auto", my: 0, py: 0, fill: "white" }}>
      <Logo style={{ height: "100%", width: size, fill: fill }} />
    </Icon>
  );
};

export const createEvaluateIcon = (size: string = '24px', fill: string = 'white') => {
  return <EvaluateIcon size={size} fill={fill} />;
}

export default EvaluateIcon;
