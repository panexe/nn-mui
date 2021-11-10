// NNUI
import ThreeColLayout from "../../layout/three-col-layout/ThreeColLayout";
import Sidebar from "./sidebar/Sidebar";
import NetworkEditor from "./network-editor/NetworkEditor";
import { ReactFlowProvider } from "react-flow-renderer";
import { Portals } from "../../../types";
import theme from "../../../theme";
import { TensorflowAdapter } from "../../../adapters/INNLib";

const Model = () => {
  return (
    <ReactFlowProvider>
      <NetworkEditor  libName="tensorflow"/>
      
    </ReactFlowProvider>
  );
};

export default Model;
