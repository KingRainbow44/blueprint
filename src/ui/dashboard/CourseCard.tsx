import React from "react";

import type { DashboardCard } from "@backend/canvas.ts";

import { colorOf } from "@app/utils.ts";

import "@css/dashboard/CourseCard.scss";

interface IProps {
    data: DashboardCard;
}

class CourseCard extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const data = this.props.data;

        return (
            <div className={"CourseCard"}>
                <div className={"CourseCard_Header"}
                     style={{
                         backgroundImage: `url(${data.image})`,
                     }}
                >
                    <div className={"CourseCard_Front"} style={{
                        backgroundColor: colorOf(data.longName)
                    }}>
                    </div>
                </div>

                {/*<div className={"CourseCard_Info"}></div>*/}
            </div>
        );
    }
}

export default CourseCard;
