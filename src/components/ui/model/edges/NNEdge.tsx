import { useEffect, useState } from "react";
import { ArrowHeadType, Edge, EdgeProps } from "react-flow-renderer";
import { getBezierPath } from "react-flow-renderer";
import { getMarkerEnd } from "react-flow-renderer";
import { useCloseConnect } from "../../../../hooks/useCloseConnect";
import { Connection } from "react-flow-renderer";

export const createNNEdge = (c : Connection) => {
  const ret = {
    id: `e${c.source}-${c.target}`,
    source: c.source,
    target: c.target,
    type: "nnedge",
    data: { text: "" },
    arrowHeadType: ArrowHeadType.Arrow,
  } as Edge;
  return ret;
};

const NNEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  arrowHeadType,
  markerEndId,
}) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [closeEnough, setCloseEnough] = useState(false);

  
  //useCloseConnect(id, true, { x: sourceX, y: sourceY });

  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text>
        <textPath
          href={`#${id}`}
          style={{ fontSize: "12px" }}
          startOffset="50%"
          textAnchor="middle"
        >
          {data.text}
        </textPath>
      </text>
    </>
  );
};

export default NNEdge;
