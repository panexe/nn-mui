import ThreeColLayout from "../../layout/three-col-layout/ThreeColLayout";
import Sidebar from "./sidebar/Sidebar";
import NetworkEditor from "./network-editor/NetworkEditor";
import LayerInfo from "./layer-info/LayerInfo";
import ModelContextProvider from "../../context-providers/ModelContextProvider";

const Model = () => {
  
  return (
    <ModelContextProvider>
      <ThreeColLayout
        leftContent={<Sidebar />}
        mainContent={<NetworkEditor />}
        rightContent={<LayerInfo />}
      />
    </ModelContextProvider>
  );
};

export default Model;
