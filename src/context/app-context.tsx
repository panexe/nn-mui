import React from "react";

const AppContext = React.createContext({
    tabIndex: 1,
    setTabIndex: (tab: number)=>{},
});

export default AppContext;