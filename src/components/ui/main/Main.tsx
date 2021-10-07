import { useContext } from "react";
import AppContext from "../../../context/app-context";
import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import Model from "../model/Model";

const StyledContainer = styled(Box)(({ theme }) => ({
  paddingTop: "56px",
  height: '100vh',
  width: '100vw',
}));

const Main = () => {
  const appContext = useContext(AppContext);
  
  let selectedTab = <p>No tab selected.</p>;

  switch (appContext.tabIndex) {
    case 0:
      selectedTab = <p style={{ bottom: "0" }}>Dataset</p>;
      break;
    case 1:
      selectedTab = (
        <Model/>
      );
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
