import React from "react";

interface IProps {
    title?: string;
    label?: string;
    image?: React.ReactNode;

    onClick?: (e: React.MouseEvent) => void;
    onHover?: (e: React.MouseEvent) => void;
    onContext?: (e: React.MouseEvent) => void;

    id?: string;
    style?: React.CSSProperties;
    className?: string;

    children?: React.ReactNode;
}

/**
 * A simple button component.
 * Children get rendered last.
 *
 * @param props The React component properties.
 */
export default function Button(props: IProps) {
    return (
        <button
            title={props.title}
            id={props.id} className={`Button ${props.className}`} style={props.style}
            onClick={props.onClick} onMouseOver={props.onHover} onContextMenu={props.onContext}
        >
            {props.label && <p>{props.label}</p>}
            {props.image && <p>{props.image}</p>}

            {props.children}
        </button>
    );
}
