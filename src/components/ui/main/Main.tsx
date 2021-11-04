import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import Model from "../model/Model";
import Dataset from "../dataset/Dataset";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Train from "../train/Train";
import DimensionInput from "../model/layer-info/DimensionInput";
import ArgsMenu from "../model/layer-info/ArgsMenu";
import { useState } from "react";

const StyledContainer = styled(Box)(({ theme }) => ({
  paddingTop: "56px",
  height: "100vh",
  width: "100vw",
}));

const Main = () => {
  const tabIndex = useSelector<RootState>((state) => state.ui.tabIndex);

  const[ dim, setDim] = useState([0]);
  console.log("dim", dim);

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
      selectedTab = <ArgsMenu><DimensionInput value={dim} setValue={setDim} min={1} max={5} /></ArgsMenu>;
      break;
  }

  return <StyledContainer>{selectedTab}</StyledContainer>;
};

export default Main;
