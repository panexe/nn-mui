import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import Model from "../model/Model";
import Dataset from "../dataset/Dataset";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Train from "../train/Train";
import { useState } from "react";
import Settings from "../settings/Settings";

const StyledContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
}));

const Main = () => {
  const tabIndex = useSelector<RootState>((state) => state.ui.tabIndex);

  let selectedTab = <p>No tab selected.</p>;

  switch (tabIndex) {
    case 0:
      selectedTab = <Dataset />;
      break;
    case 1:
      selectedTab = <Model />;
      break;
    case 2:
      selectedTab = <Train />;
      break;
    case 3:
      selectedTab = <p>Nothing yet</p>;
      break;
    case 4:
      selectedTab = <Settings />;
  }

  return <StyledContainer>{selectedTab}</StyledContainer>;
};

export default Main;
