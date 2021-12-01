import { Settings } from "@mui/icons-material";
import {
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { ReactNode } from "react";
import SettingsIcon from "../../../icons/SettingsIcon/SettingsIcon";

interface DataBoxProps {
  data: { [key: string]: string | string[] | number | boolean };
  title: string;
  icon?: ReactNode;
}

const DataBox = ({ data, title, icon }: DataBoxProps) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        border: `solid 1px ${theme.palette.divider}`,
        borderRadius: "16px",
        p: "12px",
        pl: "20px",
      }}
      elevation={1}
    >
      <Stack direction="row" spacing="16px" sx={{ mb: "8px" }}>
        {icon}
        <Typography variant="h6">{title}</Typography>
      </Stack>
      <Stack direction="row" spacing="16px">
        <Stack spacing="4px" sx={{ width: "50%" }}>
          {Object.entries(data).map(([key, val], index) => {
            if (!(index % 2)) {
              return (
                <Stack
                  key={`databox-stack-${key}-${index}`}
                  direction="row"
                  spacing="16px"
                >
                  <Tooltip
                    title={key}
                    placement="top-start"
                    TransitionComponent={Zoom}
                    enterDelay={500}
                  >
                    <Typography
                      key={`databox-typographie-key-${key}-${index}`}
                      fontSize="14px"
                      noWrap
                      sx={{ width: "60%" }}
                    >
                      {key}{" "}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    title={val.toString()}
                    placement="top-start"
                    TransitionComponent={Zoom}
                    enterDelay={500}
                  >
                    <Typography
                      key={`databox-typographie-val-${key}-${index}`}
                      fontSize="14px"
                      noWrap
                      sx={{ width: "40%" }}
                    >
                      {val.toString()}
                    </Typography>
                  </Tooltip>
                </Stack>
              );
            }
          })}
        </Stack>

        <Stack spacing="4px" sx={{ width: "50%" }}>
          {Object.entries(data).map(([key, val], index) => {
            if (index % 2) {
              return (
                <Stack
                  key={`databox-stack-${key}-${index}`}
                  direction="row"
                  spacing="16px"
                >
                  <Tooltip
                    title={key}
                    placement="top-start"
                    TransitionComponent={Zoom}
                    enterDelay={500}
                  >
                    <Typography
                      key={`databox-typographie-key-${key}-${index}`}
                      fontSize="14px"
                      noWrap
                      sx={{ width: "60%" }}
                    >
                      {key}{" "}
                    </Typography>
                  </Tooltip>
                  <Tooltip
                    title={val.toString()}
                    placement="top-start"
                    TransitionComponent={Zoom}
                    enterDelay={500}
                  >
                    <Typography
                      key={`databox-typographie-val-${key}-${index}`}
                      fontSize="14px"
                      noWrap
                      sx={{ width: "40%" }}
                    >
                      {val.toString()}
                    </Typography>
                  </Tooltip>
                </Stack>
              );
            }
          })}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DataBox;
