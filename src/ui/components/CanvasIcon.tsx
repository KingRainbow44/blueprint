import { ModuleItemType } from "@backend/canvas.ts";

interface IProps {
    type: ModuleItemType;
}

export default function CanvasIcon(props: IProps) {
    return (
        <span className={"ig-type-icon"}
              style={{ background: "transparent" }}
        >
            {props.type == "File" && <i className={"icon-document"} />}
            {props.type == "Page" && <i className={"icon-paperclip"} />}
            {props.type == "Discussion" && <i className={"icon-discussion"} />}
            {props.type == "Assignment" && <i className={"icon-assignment"} />}
            {props.type == "Quiz" && <i className={"icon-quiz"} />}
            {props.type == "ExternalUrl" && <i className={"icon-link"} />}
        </span>
    );
}
