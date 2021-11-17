// NNUI
import NetworkEditor from "./network-editor/NetworkEditor";
import { ReactFlowProvider } from "react-flow-renderer";

const Model = () => {
  return (
    <ReactFlowProvider>
      <NetworkEditor libName="tensorflow" />
    </ReactFlowProvider>
  );
};

export default Model;
