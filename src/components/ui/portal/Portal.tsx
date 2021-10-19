import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props{
    children?: ReactNode,
    destination: string,
    id: string;
}

const Portal = (props: Props) => {
    const mount = document.getElementById(props.destination);
    const el = document.createElement('div');

    useEffect(()=> {
        mount?.appendChild(el);
        return () => {mount?.removeChild(el)};
    },[mount, el]);

    return createPortal(props.children, el, `${props.id}-portal`);
}

export default Portal;