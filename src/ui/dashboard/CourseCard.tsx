import React from "react";

import type { DashboardCard } from "@backend/canvas.ts";

import router from "@app/content.tsx";
import Logger from "@backend/logger.ts";
import { colorOf } from "@app/utils.ts";
import { Routes } from "@app/constants.ts";

import "@css/dashboard/CourseCard.scss";

interface IProps {
    data: DashboardCard;
}

class CourseCard extends React.PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    /**
     * Navigates to this course.
     * @private
     */
    private navigate(): void {
        router.navigate(`${Routes.COURSE}/${this.props.data.id}`)
            .catch(() => Logger.error("Failed to navigate to course."));
    }

    render() {
        const data = this.props.data;

        return (
            <div className={"CourseCard"}
                 onClick={() => this.navigate()}
            >
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
