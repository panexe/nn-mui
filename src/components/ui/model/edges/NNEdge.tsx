import * as React from 'react';
import { getMarkerEnd, getEdgeCenter, EdgeProps, Position } from 'react-flow-renderer';
import * as constants from '../../../../constants/constants';

// These are some helper methods for drawing the round corners
// The name indicates the direction of the path. "bottomLeftCorner" goes
// from bottom to the left and "leftBottomCorner" goes from left to the bottom.
// We have to consider the direction of the paths because of the animated lines.
const bottomLeftCorner = (x: number, y: number, size: number): string =>
    `L ${x},${y - size}Q ${x},${y} ${x + size},${y}`;
const leftBottomCorner = (x: number, y: number, size: number): string =>
    `L ${x + size},${y}Q ${x},${y} ${x},${y - size}`;
const bottomRightCorner = (x: number, y: number, size: number): string =>
    `L ${x},${y - size}Q ${x},${y} ${x - size},${y}`;
const rightBottomCorner = (x: number, y: number, size: number): string =>
    `L ${x - size},${y}Q ${x},${y} ${x},${y - size}`;
const leftTopCorner = (x: number, y: number, size: number): string =>
    `L ${x + size},${y}Q ${x},${y} ${x},${y + size}`;
const topLeftCorner = (x: number, y: number, size: number): string =>
    `L ${x},${y + size}Q ${x},${y} ${x + size},${y}`;
const topRightCorner = (x: number, y: number, size: number): string =>
    `L ${x},${y + size}Q ${x},${y} ${x - size},${y}`;
const rightTopCorner = (x: number, y: number, size: number): string =>
    `L ${x - size},${y}Q ${x},${y} ${x},${y + size}`;

interface GetSmoothStepPathParams {
    sourceX: number;
    sourceY: number;
    sourcePosition?: Position;
    targetX: number;
    targetY: number;
    targetPosition?: Position;
    borderRadius?: number;
    centerX?: number;
    centerY?: number;
}

const getSmoothStepPath = ({
    sourceX,
    sourceY,
    sourcePosition = Position.Bottom,
    targetX,
    targetY,
    targetPosition = Position.Top,
    borderRadius = 5,
    centerX,
    centerY,
}: GetSmoothStepPathParams): string => {
    const [_centerX, _centerY, offsetX, offsetY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    const cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX));
    const cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY));
    const cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY);
    const leftAndRight = [Position.Left, Position.Right];
    const cX = typeof centerX !== 'undefined' ? centerX : _centerX;
    const cY = typeof centerY !== 'undefined' ? centerY : _centerY;

    let firstCornerPath = '';
    let secondCornerPath = '';
    let sourceCornerPath = '';
    let targetCornerPath = '';
    let halfCornerPath = '';
    let sourceWrapPath = '';

    
    // source is left of target 
    if (sourceX <= targetX) {
        // source is below and on the left 
        if (sourceY > targetY) {
            firstCornerPath = rightBottomCorner(sourceX + constants.NODE_WIDTH / 2 , sourceY + 5, cornerSize);
            sourceCornerPath = bottomLeftCorner(sourceX, sourceY + 5, cornerSize);
            targetCornerPath = rightTopCorner(targetX, targetY - 5, cornerSize);
            secondCornerPath = topLeftCorner(targetX - constants.NODE_WIDTH / 2 , targetY - 5, cornerSize);

            if (sourceX + 185 > targetX) {
                if (sourceX + 95 > targetX) {
                    firstCornerPath = rightBottomCorner(targetX + constants.NODE_WIDTH / 2 , sourceY + 5, cornerSize);
                    secondCornerPath = topRightCorner(targetX + constants.NODE_WIDTH / 2 , targetY - 5, cornerSize);
                    targetCornerPath = leftTopCorner(targetX, targetY - 5, cornerSize);
                    halfCornerPath = '';
                } else {
                    sourceWrapPath = topRightCorner(sourceX + constants.NODE_WIDTH / 2 , sourceY - constants.NODE_WIDTH / 2 , cornerSize);
                    halfCornerPath = leftBottomCorner(
                        sourceX - (sourceX + constants.NODE_WIDTH / 2  - targetX),
                        sourceY - constants.NODE_WIDTH / 2 ,
                        cornerSize,
                    );
                }
            } else {
                sourceWrapPath = '';
                halfCornerPath = '';
                firstCornerPath = rightBottomCorner(targetX - constants.NODE_WIDTH / 2 , sourceY + 5, cornerSize);
            }
        // source is above and on the left 
        } else {
            firstCornerPath = bottomLeftCorner(sourceX, cY, cornerSize);
            secondCornerPath = rightTopCorner(targetX, cY, cornerSize);
        }
    // source is below target 
    } else if (sourceY > targetY) {
        sourceCornerPath = bottomRightCorner(sourceX, sourceY + 5, cornerSize);
        firstCornerPath = leftBottomCorner(sourceX - constants.NODE_WIDTH / 2 , sourceY + 5, cornerSize);
        targetCornerPath = leftTopCorner(targetX, targetY - 5, cornerSize);
        secondCornerPath = topRightCorner(targetX + constants.NODE_WIDTH / 2 , targetY - 5, cornerSize);

        if (sourceX < targetX + 185) {
            if (sourceX < targetX + 95) {
                firstCornerPath = leftBottomCorner(targetX - constants.NODE_WIDTH / 2 , sourceY + 5, cornerSize);
                secondCornerPath = topLeftCorner(targetX - constants.NODE_WIDTH / 2 , targetY - 5, cornerSize);
                targetCornerPath = rightTopCorner(targetX, targetY - 5, cornerSize);
                halfCornerPath = '';
            } else {
                sourceWrapPath = topLeftCorner(sourceX - constants.NODE_WIDTH / 2 , sourceY - constants.NODE_WIDTH / 2 , cornerSize);
                halfCornerPath = rightBottomCorner(targetX + constants.NODE_WIDTH / 2 , sourceY - constants.NODE_WIDTH / 2 , cornerSize);
            }
        } else {
            sourceWrapPath = '';
            halfCornerPath = '';
            firstCornerPath = leftBottomCorner(targetX + constants.NODE_WIDTH / 2 , sourceY + 5, cornerSize);
        }
    } else {
        firstCornerPath = bottomRightCorner(sourceX, cY, cornerSize);
        secondCornerPath = leftTopCorner(targetX, cY, cornerSize);
    }

    if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
        if (sourceX <= targetX) {
            firstCornerPath =
                sourceY <= targetY
                    ? rightTopCorner(cX, sourceY, cornerSize)
                    : rightBottomCorner(cX, sourceY, cornerSize);
            secondCornerPath =
                sourceY <= targetY
                    ? bottomLeftCorner(cX, targetY, cornerSize)
                    : topLeftCorner(cX, targetY, cornerSize);
        } else if (sourcePosition === Position.Right && targetPosition === Position.Left) {
            // and sourceX > targetX
            firstCornerPath =
                sourceY <= targetY
                    ? leftTopCorner(cX, sourceY, cornerSize)
                    : leftBottomCorner(cX, sourceY, cornerSize);
            secondCornerPath =
                sourceY <= targetY
                    ? bottomRightCorner(cX, targetY, cornerSize)
                    : topRightCorner(cX, targetY, cornerSize);
        }
    } else if (leftAndRight.includes(sourcePosition) && !leftAndRight.includes(targetPosition)) {
        if (sourceX <= targetX) {
            firstCornerPath =
                sourceY <= targetY
                    ? rightTopCorner(targetX, sourceY, cornerSize)
                    : rightBottomCorner(targetX, sourceY, cornerSize);
        } else {
            firstCornerPath =
                sourceY <= targetY
                    ? leftTopCorner(targetX, sourceY, cornerSize)
                    : leftBottomCorner(targetX, sourceY, cornerSize);
        }
        secondCornerPath = '';
    } else if (!leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
        if (sourceX <= targetX) {
            firstCornerPath =
                sourceY <= targetY
                    ? bottomLeftCorner(sourceX, targetY, cornerSize)
                    : topLeftCorner(sourceX, targetY, cornerSize);
        } else {
            firstCornerPath =
                sourceY <= targetY
                    ? bottomRightCorner(sourceX, targetY, cornerSize)
                    : topRightCorner(sourceX, targetY, cornerSize);
        }
        secondCornerPath = '';
    }

    return `M ${sourceX},${sourceY}${sourceCornerPath}${firstCornerPath}${sourceWrapPath}${halfCornerPath}${secondCornerPath}${targetCornerPath}L ${targetX},${targetY}`;
};

const CustomEdge: React.FC<EdgeProps> = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    arrowHeadType,
    markerEndId,
}: EdgeProps) => {
    const edgePath = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
        </>
    );
};

export default React.memo(CustomEdge);