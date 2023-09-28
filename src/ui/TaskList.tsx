import React from "react";

interface IProps {

}

interface IState {

}

class TaskList extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={"TaskList"}>

            </div>
        );
    }
}

export default TaskList;
