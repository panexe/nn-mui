import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import Model from "../model/Model";
import Dataset from "../dataset/Dataset";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const StyledContainer = styled(Box)(({ theme }) => ({
  paddingTop: "56px",
  height: "100vh",
  width: "100vw",
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
      selectedTab = <p>Train</p>;
      break;
    case 3:
      selectedTab = <p>Eval</p>;
      break;
  }

  return <StyledContainer>{selectedTab}</StyledContainer>;
};

export default Main;
