import {
  Box,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import SettingsIcon from "../../../icons/SettingsIcon/SettingsIcon";
import TextInput from "../../model/layer-info/TextInput";

const TrainSideMenu = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  const [text, setText] = useState("text");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const tab1 = (
    <Box sx={{ width: "100%", height: "100%", p: "16px" }}>
      <Stack>
        <Typography fontSize="18px">Tab Title</Typography>
        <TextInput
          value={text}
          setValue={setText}
          name="test input"
          ref={null}
        />
        <TextInput
          value={text}
          setValue={setText}
          name="test input"
          ref={null}
        />
        <TextInput
          value={text}
          setValue={setText}
          name="test input"
          ref={null}
        />
      </Stack>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "100%",
        width: "100%",
        borderLeft: `solid 1px ${theme.palette.divider}`,
        borderTop: `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack>
        <Stack direction="row" spacing="16px" sx={{ mb: "8px", p: "16px" }}>
          <SettingsIcon />
          <Typography variant="h6">Title of Databoxs</Typography>
        </Stack>
        <Tabs
          value={tab}
          onChange={handleChange}
          variant="fullWidth"
          sx={{ width: "100%" }}
        >
          <Tab label="item 1" />
          <Tab label="item 2" />
        </Tabs>
        <Divider />
        {tab === 0 && tab1}
      </Stack>
    </Box>
  );
};

export default TrainSideMenu;
