import React from "react";

import "@css/components/Divided.scss";

interface IProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;

    children?: React.ReactNode;
}

export default function Divided(props: IProps) {
    return (
        <div
            id={props.id} className={`Divided ${props.className}`} style={props.style}
        >
            {props.children}
        </div>
    );
}
