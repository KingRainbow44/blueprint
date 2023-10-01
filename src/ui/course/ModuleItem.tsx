import React from "react";

import { Link } from "react-router-dom";

import type { ModuleItem as ModuleItemType } from "@backend/canvas.ts";

import "@css/course/ModuleItem.scss";
import CanvasIcon from "@components/CanvasIcon.tsx";

/**
 * Cleans the URL.
 *
 * @param url The URL to clean.
 */
function cleanUrl(url: string): string {
    // Check if the URL is an API URL.
    if (url.includes("/api/")) return url;

    // Replace 'courses' with 'course'
    url = url.replace("/courses/", "/course/");

    return url;
}

interface IProps {
    data: ModuleItemType;
}

class ModuleItem extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { data } = this.props;

        const url = cleanUrl(data.html_url ?? "/");

        return (
            <div className={"ModuleItem"}>
                <CanvasIcon type={data.type} />

                {
                    data.new_tab ? (
                        <a href={url} target={"_blank"}>{data.title}</a>
                    ) : (
                        <Link to={url}>{data.title}</Link>
                    )
                }
            </div>
        );
    }
}

export default ModuleItem;
