// NNUI
import ThreeColLayout from "../../layout/three-col-layout/ThreeColLayout";
import Sidebar from "./sidebar/Sidebar";
import NetworkEditor from "./network-editor/NetworkEditor";
import ModelContextProvider from "../../context-providers/ModelContextProvider";
import { Elements, ReactFlowProvider } from "react-flow-renderer";
import { Portals } from "../../../types";
import { useState } from "react";
import { initialElements } from "./network-editor/initialElements";
import theme from "../../../theme";

const Model = () => {
  const [elements, setElements] = useState<Elements>(initialElements);

  return (
    <ReactFlowProvider>
      <ModelContextProvider>
        <ThreeColLayout
          leftContent={<Sidebar />}
          mainContent={<NetworkEditor elements={elements} />}
          rightContent={<div id={Portals.layerInfo} style={{backgroundColor: theme.palette.action.hover, height:"100%", overflow:'auto'}}></div>}
        />
      </ModelContextProvider>
    </ReactFlowProvider>
  );
};

export default Model;
