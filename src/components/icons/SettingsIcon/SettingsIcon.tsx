import { Icon} from "@mui/material";
import { ReactComponent as Logo } from "./setting.svg";

interface SettingsIconProps{
  size?: string;
  fill?: string;
}

const SettingsIcon = ({size = '24px', fill='white'}: SettingsIconProps) => {
  return (
    <Icon sx={{ height: "auto", width: "auto", my: 0, py: 0, fill: "white" }}>
      <Logo fill={fill} height="auto" width={size} />
    </Icon>
  );
};

export const createSettingsIcon = (size: string = '24px', fill: string = 'white') => {
  return <SettingsIcon size={size} fill={fill} />;
}

export default SettingsIcon;
