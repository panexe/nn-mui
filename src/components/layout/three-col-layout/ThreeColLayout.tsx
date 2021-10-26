import Split from "react-split";
import { styled } from "@mui/system";

const StyledSplit = styled(Split)(({ theme }) => ({
  'div.gutter': {
    backgroundColor: theme.palette.action.hover,
  },
  'div.gutter:hover': {
    backgroundColor: theme.palette.primary.main,
    cursor: 'col-resize',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
  }
}));

/**
 * 
 */
export interface ThreeColLayoutProps {
  /** Left sidebar. */
  leftContent: JSX.Element;
  /** Content in the center. */
  mainContent: JSX.Element;
  /** Ride sidebar.  */
  rightContent: JSX.Element;
}

/**
 * Three column layout with movable splits.
 * 
 * Standard size-distribution: 
 * - left: 20% 
 * - center: 57%
 * - right: 23%
 * 
 * 
 * **TODO:** 
 * make minSize, maxSize adjustable
 * 
 * @param props 
 * @returns 
 */
const ThreeColLayout = (props: ThreeColLayoutProps) => {
  return (
    <StyledSplit
      sizes={[20, 57, 23]}
      minSize={[200,600,200]}
      style={{display: 'flex', height: '100%'}}
      gutterSize={5}
    >
      <div style={{display: 'inline'}}>{props.leftContent}</div>
      <div style={{display: 'inline'}}>{props.mainContent}</div>
      <div style={{display: 'inline'}}>{props.rightContent}</div>
    </StyledSplit>
  );
};

export default ThreeColLayout;
