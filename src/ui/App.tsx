import React, { useEffect } from "react";

import { Location, Route, Routes, useLocation } from "react-router-dom";

import NavSideBar from "@ui/NavSideBar.tsx";
import Dashboard from "@ui/Dashboard.tsx";
import TaskList from "@ui/TaskList.tsx";

import { Routes as AppRoutes } from "@app/constants";

import "@css/App.scss";
import "@css/Text.scss";

interface IState {

}

class App extends React.Component<object, IState> {
    constructor(props: object) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        // Add event listener to change the window title.
        window.addEventListener("navigate", (event: Event) => {
            if (event instanceof CustomEvent) {
                const pathName = (event.detail as Location).pathname;
                const routeName = AppRoutes.getName(pathName);
                document.title = `${routeName} | Blueprint`;
            }
        });
    }

    render() {
        return (
            <div className={"App"}>
                <NavSideBar />
                <Routing />
            </div>
        );
    }
}

function Home() {
    return (
        <>
            <Dashboard />
            <TaskList />
        </>
    );
}

function Routing() {
    const location = useLocation();

    useEffect(() => {
        const navigateEvent = new CustomEvent(
            "navigate", { detail: location });
        window.dispatchEvent(navigateEvent);
    }, [location]);

    return (
        <Routes>
            <Route path={AppRoutes.HOME} element={<Home />} />
        </Routes>
    );
}

export default App;
