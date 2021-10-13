// NNUI
import ThreeColLayout from "../../layout/three-col-layout/ThreeColLayout";
import Sidebar from "./sidebar/Sidebar";
import NetworkEditor from "./network-editor/NetworkEditor";
import LayerInfo from "./layer-info/LayerInfo";
import ModelContextProvider from "../../context-providers/ModelContextProvider";
import { ReactFlowProvider } from "react-flow-renderer";
import { Portals } from "../../../types";

const Model = () => {
  return (
    <ReactFlowProvider>
      <ModelContextProvider>
        <ThreeColLayout
          leftContent={<Sidebar />}
          mainContent={<NetworkEditor />}
          rightContent={<div id={Portals.layerInfo}></div>}
        />
      </ModelContextProvider>
    </ReactFlowProvider>
  );
};

export default Model;
