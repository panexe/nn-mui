import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import TextInput from "../../model/layer-info/TextInput";

const TrainSideMenuTab = () => {
  const [text, setText] = useState("test");

  return (
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
};

export default TrainSideMenuTab;
