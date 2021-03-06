import { Icon} from "@mui/material";
import { ReactComponent as Logo } from "./train.svg";

interface TrainIconProps{
  size?: string; 
  fill?: string;
}

const TrainIcon = ({size = '24px', fill='white'}: TrainIconProps) => {
  return (
    <Icon sx={{ height: "auto", width: "auto", my: 0, py: 0, fill: "white" }}>
      <Logo style={{ height: "100%", width: size, fill: fill }} />
    </Icon>
  );
};

export const createTrainIcon = (size: string = '24px', fill: string = 'white') => {
  return <TrainIcon size={size} fill={fill} />;
}

export default TrainIcon;
