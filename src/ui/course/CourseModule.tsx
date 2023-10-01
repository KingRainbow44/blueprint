import React from "react";

import type { ModuleItem } from "@backend/canvas.ts";

interface IProps {
    module: ModuleItem;
}

interface IState {

}

class CourseModule extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={"CourseModule"}>

            </div>
        );
    }
}

export default CourseModule;
