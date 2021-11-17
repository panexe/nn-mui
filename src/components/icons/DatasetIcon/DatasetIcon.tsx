import { Icon} from "@mui/material";
import { ReactComponent as Logo } from "./dataset.svg";

interface DatasetIconProps{
  size?: string; 
  fill?: string;
}

const DatasetIcon = ({size = '24px', fill= 'white'}: DatasetIconProps) => {
  return (
    <Icon sx={{ height: "auto", width: "auto", my: 0, py: 0, fill: "white" }}>
      <Logo fill={fill} height="auto" width={size} />
    </Icon>
  );
};

export const createDatasetIcon = (size: string = '24px', fill: string = 'white') => {
  return <DatasetIcon size={size} fill={fill} />;
}

export default DatasetIcon;
