import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props{
    children?: ReactNode,
    destination: string,
}

const Portal = (props: Props) => {
    const mount = document.getElementById(props.destination);
    const el = document.createElement('div');

    useEffect(()=> {
        mount?.appendChild(el);
        return () => {mount?.removeChild(el)};
    },[mount, el]);

    const portalContent = () => {
        return <div>{props.children}</div>;
    }


    return createPortal(portalContent(), el, `${props.destination}-portal`);
}

export default Portal;