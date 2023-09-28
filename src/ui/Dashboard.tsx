import React from "react";

import Grid from "@components/Grid.tsx";
import Divided from "@components/Divided.tsx";
import CourseCard from "@ui/dashboard/CourseCard.tsx";

import Canvas from "@backend/canvas.ts";
import type { DashboardCard } from "@backend/canvas.ts";

import "@css/Dashboard.scss";

interface IProps {

}

interface IState {
    courses: DashboardCard[] | null;
}

class Dashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            courses: null
        };
    }

    async componentDidMount() {
        this.setState({
            courses: await Canvas.getCourses({ dash: true }) as DashboardCard[]
        });
    }

    render() {
        const { courses } = this.state;

        return (
            <div className={"Dashboard"}>
                <Divided style={{ marginBottom: "15px" }}>
                    <h1 className={"Dashboard_Title"}>Dashboard</h1>
                </Divided>

                {
                    !courses ? (
                        <p className={"Dashboard_Courses"}>Waiting for your courses to load...</p>
                    ) : (
                        <Grid className={"Dashboard_Courses"} id={"dashboardCourses"}
                              cards={courses?.length ?? 0} cardWidth={262} cardGap={15}
                              cardMapper={(index) =>
                                  <CourseCard data={courses[index]} key={index} />}
                        />
                    )
                }
            </div>
        );
    }
}

export default Dashboard;
