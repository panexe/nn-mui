import { Settings } from "@mui/icons-material";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import SettingsIcon from "../../../icons/SettingsIcon/SettingsIcon";

const DataBox = () => {
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
        <SettingsIcon />
        <Typography variant="h6">Title of Databoxs</Typography>
      </Stack>
      <Stack direction="row" spacing="16px">
        <Stack spacing='4px' sx={{width: '50%'}}>
          <Stack direction="row" spacing="16px">
            <Typography fontSize='14pt' sx={{ width: "100px" }}>Value: </Typography>
            <Typography fontSize='14pt' sx={{ width: "100px" }}>10</Typography>
          </Stack>
          <Stack direction="row" spacing="16px">
            <Typography fontSize='14pt' sx={{ width: "100px" }}>Value: </Typography>
            <Typography  fontSize='14pt'sx={{ width: "100px" }}>10</Typography>
          </Stack>
          <Stack direction="row" spacing="16px">
            <Typography fontSize='14pt' sx={{ width: "100px" }}>Value: </Typography>
            <Typography fontSize='14pt' sx={{ width: "100px" }}>10</Typography>
          </Stack>
        </Stack>

        <Stack spacing='4px'>
          <Stack direction="row" spacing="16px">
            <Typography fontSize='14pt' sx={{ width: "100px" }}>Value: </Typography>
            <Typography fontSize='14pt' sx={{ width: "100px" }}>10</Typography>
          </Stack>
          <Stack direction="row" spacing="16px">
            <Typography fontSize='14pt' sx={{ width: "100px" }}>Value: </Typography>
            <Typography  fontSize='14pt'sx={{ width: "100px" }}>10</Typography>
          </Stack>
          <Stack direction="row" spacing="16px">
            <Typography fontSize='14pt' sx={{ width: "100px" }}>Value: </Typography>
            <Typography fontSize='14pt' sx={{ width: "100px" }}>10</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default DataBox;
