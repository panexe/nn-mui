import { Icon } from "@mui/material";
import { ReactComponent as Logo } from "./dataset.svg";

interface DatasetIconProps {
  size?: string;
  fill?: string;
}

const DatasetIcon = ({ size = "24px", fill = "white" }: DatasetIconProps) => {
  return (
    <Icon sx={{ height: "100%", width: "auto", my: 0, py: 0, fill: "white" }}>
      <Logo style={{ height: "100%", width: size, fill: fill }} />
    </Icon>
  );
};

export const createDatasetIcon = (
  size: string = "24px",
  fill: string = "white"
) => {
  return <DatasetIcon size={size} fill={fill} />;
};

export default DatasetIcon;
