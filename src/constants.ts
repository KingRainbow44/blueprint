export class Routes {
    public static readonly HOME = "/";
    public static readonly CALENDAR = "/calendar";
    public static readonly MESSAGES = "/inbox";
    public static readonly SETTINGS = "/settings";

    static readonly reverse: { [key: string]: string } = {
        [Routes.HOME]: "Home",
        [Routes.CALENDAR]: "Calendar",
        [Routes.MESSAGES]: "Messages",
        [Routes.SETTINGS]: "Settings",
    };

    /**
     * Gets the name of a route.
     *
     * @param route The route to get the name of.
     */
    public static getName(route: string): string {
        return Routes.reverse[route] ?? route;
    }
}
