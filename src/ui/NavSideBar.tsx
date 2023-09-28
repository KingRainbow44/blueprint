import React from "react";

import DashboardIcon from "@icons/dashboard.svg?react";
import CalendarIcon from "@icons/calendar.svg?react";
import MailIcon from "@icons/mail.svg?react";

import { NavLink as Link } from "react-router-dom";

import { Routes } from "@app/constants.ts";

import "@css/NavSideBar.scss";

function NavLink(props: {
    to: string; icon: React.ReactNode;
    color: (active: boolean) => React.CSSProperties;
}) {
    return (
        <Link to={props.to}
              className={"NavSideBar_Link"}
              style={({ isActive }) => props.color(isActive)}
        >
            {props.icon}
            <p>{Routes.getName(props.to)}</p>
        </Link>
    )
}

interface IProps {

}

interface IState {

}

class NavSideBar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    /**
     * Determines the button background color.
     *
     * @param isActive Whether the button is active.
     * @private
     */
    private getBackgroundColor(isActive: boolean): React.CSSProperties {
        return {
            backgroundColor: isActive ? "var(--button-primary)" : undefined
        };
    }

    render() {
        return (
            <div className={"NavSideBar"}>
                <NavLink to={Routes.HOME} icon={<DashboardIcon />}
                         color={this.getBackgroundColor.bind(this)}
                />

                <NavLink to={Routes.CALENDAR} icon={<CalendarIcon />}
                         color={this.getBackgroundColor.bind(this)}
                />

                <NavLink to={Routes.MESSAGES} icon={<MailIcon />}
                         color={this.getBackgroundColor.bind(this)}
                />
            </div>
        );
    }
}

export default NavSideBar;
