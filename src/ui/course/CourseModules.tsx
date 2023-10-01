import React from "react";

import Collapsible from "react-collapsible";

import Divided from "@components/Divided.tsx";
import WithNavigation from "@components/WithNavigation.tsx";

import ModuleItem from "@ui/course/ModuleItem.tsx";

import User from "@backend/user.ts";
import Canvas from "@backend/canvas.ts";
import type { Course, Module } from "@backend/canvas.ts";

import "@css/course/CourseModules.scss";

interface IProps {
    params: {
        id: string;
    };
}

interface IState {
    course: Course | null;
    modules: Module[];
}

class CourseModules extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            course: null,
            modules: []
        };
    }

    /**
     * Loads the course from the ID.
     * @private
     */
    private async loadCourse(): Promise<void> {
        const courseId = parseInt(this.props.params.id);
        const course = await Canvas.getCourse(courseId);

        // Check if the course is valid.
        if (course == undefined)
            throw new Error("Failed to load course.");

        this.setState({ course: course as Course });
    }

    /**
     * Loads all modules for the course.
     * @private
     */
    private async loadModules(): Promise<void> {
        // Check if the course has loaded.
        const course = this.state.course;
        if (course == null) return;

        // Resolve all modules.
        const modules = await Canvas.getModules(course);
        // Resolve module items.
        for (const module of modules) {
            if (module.items == undefined || module.items.length == 0) {
                module.items = await Canvas.getModuleItems(module);
            }
        }

        this.setState({ modules });
    }

    async componentDidMount() {
        await this.loadCourse();
        await this.loadModules();
    }

    render() {
        return (
            <div className={"CourseModules"}>
                <Divided className={"CourseModules_Title"}>
                    <h1>Modules</h1>
                </Divided>

                <div className={"CourseModules_List"}>
                    {
                        this.state.modules.map((module, index) => (
                        <Collapsible trigger={module.name} key={index}
                                     open={User.collapseModule({ module })}
                                     onOpen={() => User.collapseModule({ module, collapse: true })}
                                     onClose={() => User.collapseModule({ module, collapse: false })}
                                     triggerClassName={"CourseModules_Trigger"}
                                     openedClassName={"CourseModules_Module"}
                            >
                                {
                                    !module.items || module.items.length == 0 ? (
                                        <p>There are no items in this module.</p>
                                    ) : module.items.map((item, index) => (
                                        <ModuleItem data={item} key={index} />
                                    ))
                                }
                            </Collapsible>
                        ))
                    }
                </div>
            </div>
        );
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default WithNavigation(CourseModules);
