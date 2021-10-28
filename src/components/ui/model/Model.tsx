// NNUI
import ThreeColLayout from "../../layout/three-col-layout/ThreeColLayout";
import Sidebar from "./sidebar/Sidebar";
import NetworkEditor from "./network-editor/NetworkEditor";
import ModelContextProvider from "../../context-providers/ModelContextProvider";
import { ReactFlowProvider } from "react-flow-renderer";
import { Portals } from "../../../types";
import theme from "../../../theme";

const Model = () => {
  return (
    <ReactFlowProvider>
      <ModelContextProvider>
        <ThreeColLayout
          leftContent={<Sidebar />}
          mainContent={<NetworkEditor />}
          rightContent={
            <div
              id={Portals.layerInfo}
              style={{
                backgroundColor: theme.palette.action.hover,
                height: "100%",
                overflow: "auto",
              }}
            ></div>
          }
        />
      </ModelContextProvider>
    </ReactFlowProvider>
  );
};

export default Model;
