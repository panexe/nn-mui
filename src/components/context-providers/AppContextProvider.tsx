import AppContext from "../../context/app-context";
import { useState } from "react";

const AppContextProvider: React.FC = (props) => {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <AppContext.Provider
      value={{ tabIndex: tabIndex, setTabIndex: setTabIndex }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
