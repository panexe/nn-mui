import { Stack } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const ArgsMenu = (props: Props) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={0}
      sx={{ margin: "1em", fontSize: "24px" }}
    >
      {props.children}
    </Stack>
  );
};

// workaround because forwardRef doesnt really work with generics
export default ArgsMenu;
