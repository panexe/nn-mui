// REACT
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * 
 */
export interface PortalProps{
    children?: ReactNode,
    /** id of destination-element   */
    destination: string,
    /** unique id of this portal */
    id: string;
}

/**
 * Creates a portal to the given destination.
 * Elements placed inside the portal will be placed at the endpoint in the DOM-tree.
 * 
 * To use this portal, a HTMLElement with the given destination 
 * as id must exist in the document. 
 * @param props 
 * @returns 
 */
const Portal = (props: PortalProps) => {
    const mount = document.getElementById(props.destination);
    const el = document.createElement('div');

    useEffect(()=> {
        mount?.appendChild(el);
        return () => {mount?.removeChild(el)};
    },[mount, el]);

    return createPortal(props.children, el, `${props.id}-portal`);
}
export default Portal;