/*
 * Notes about the Canvas API:
 * - Authentication is done using the browser's cookies.
 * - The API is documented in the Canvas GitHub repository:
 *   https://github.com/instructure/canvas-lms
 */

// This holds the backings for the UI to access.
// All information here is cached.

import { fetch as cache } from "@app/utils.ts";

export default class Canvas {
    /**
     * Fetches all courses.
     *
     * @param options The query options.
     * @param options.dash Whether to fetch the dashboard cards.
     * @param options.as The type of enrollment to fetch. Defaults to everything.
     */
    public static async getCourses(options?: {
        dash?: boolean;
        as?: Enrollment;
        describe?: boolean;
    }): Promise<Course[] | DashboardCard[]> {
        const courses = options?.dash ?
            await cache("dashCards", () => API.getDashboardCards()) :
            await cache("courses",
                () => API.getCourses(options?.as, options?.describe));

        // Convert to an array.
        if (typeof courses == "object") {
            return Object.values(courses);
        } else {
            return courses;
        }
    }

    /**
     * Fetches a course.
     *
     * @param id The ID of the course to fetch.
     */
    public static async getCourse(id: number): Promise<Course | DashboardCard | undefined> {
        return (await Canvas.getCourses()).find(course => course.id == id);
    }

    /**
     * Fetches the modules for a given course.
     *
     * @param course The course to fetch the modules for.
     */
    public static async getModules(course: Course): Promise<Module[]> {
        const modules = await cache(`modules${course.id}`, () => API.getModules(course));

        // Convert to an array.
        if (typeof modules == "object") {
            return Object.values(modules);
        } else {
            return modules;
        }
    }

    /**
     * Gets the items in a module.
     *
     * @param module The module to fetch the items for.
     */
    public static async getModuleItems(module: Module): Promise<ModuleItem[]> {
        const items = await cache(`items${module.id}`, () => API.getModuleItems(module));

        // Convert to an array.
        if (typeof items == "object") {
            return Object.values(items);
        } else {
            return items;
        }
    }
}

// This holds the direct API calls.
class API {
    /**
     * The base URL for the Canvas API.
     */
    public static getBaseUrl(): string {
        return `${window.location.protocol + "//" + window.location.host}`;
    }

    /**
     * Performs an HTTP request to the Canvas API.
     *
     * @param route The route to call.
     * @param requestInit The request options.
     */
    public static async call(route: string, requestInit?: RequestInit): Promise<Response> {
        return await fetch(`${API.getBaseUrl()}/api/v1${route}`, requestInit);
    }

    /**
     * Fetches all courses for the current user.
     *
     * @param as The type of enrollment to fetch. Defaults to everything.
     * @param describe Whether to fetch the course descriptions.
     */
    public static async getCourses(as?: Enrollment, describe?: boolean): Promise<Course[]> {
        let route = "/courses?";
        if (as) {
            route += `enrollment_type=${as || ""}&`;
        }
        if (describe) {
            route += "include[]=syllabus_body&";
        }

        const response = await API.call(route);
        return await response.json();
    }

    /**
     * Fetches the modules for a given course.
     *
     * @param course The course to fetch the modules for.
     */
    public static async getModules(course: Course): Promise<Module[]> {
        const route = `/courses/${course.id}/modules?include[]=items`;
        const response = await API.call(route);
        return await response.json();
    }

    /**
     * Fetches the items in a module.
     *
     * @param module The module to fetch the items for.
     */
    public static async getModuleItems(module: Module): Promise<ModuleItem[]> {
        const response = await API.call(module.items_url);
        return await response.json();
    }

    /**
     * Fetches the dashboard cards for the current user.
     */
    public static async getDashboardCards(): Promise<DashboardCard[]> {
        const response = await API.call("/dashboard/dashboard_cards");
        return await response.json();
    }
}

// The following are the types of the Canvas API.

export type Enrollment = "teacher" | "student" | "ta" | "observer" | "designer";
export type ModuleItemType = "Page"  | "SubHeader" | "ExternalUrl" | "File" | "Discussion" | "Assignment" | "Quiz" | "ExternalTool";

// https://canvas.instructure.com/doc/api/courses.html#Course
export type Course = {
    id: number;
    uuid: string;
    name: string;
    course_code: string;
    original_name: string;
    syllabus_body: string; // This is HTML which should be rendered.
};

// https://canvas.instructure.com/doc/api/modules.html#Module
export type Module = {
    id: number;
    workflow_state: "active" | "deleted";
    position: number;
    name: string;
    items_count: number;
    items_url: string;
    items: ModuleItem[] | undefined;
    state: "locked" | "unlocked" | "started" | "completed";
};

// https://canvas.instructure.com/doc/api/modules.html#ModuleItem
export type ModuleItem = {
    id: number;
    module_id: number;
    position: number;
    title: string;
    indent: number;
    type: ModuleItemType;
    content_id?: number;
    html_url: string | null;
    url?: string; // This is the Canvas API object URL.
    page_url?: string;
    external_url?: string;
    new_tab?: boolean;
    content_details: {
        points_possible: number;
        due_at: string | null;
        unlock_at: string | null;
        lock_at: string | null;
    };
};

// No documentation. This is inferred from the API response.
export type DashboardCard = {
    longName: string;
    shortName: string;
    originalName: string;
    courseCode: string;
    id: string;
    image: string;
    links: {
        css_class: string;
        icon: string;
        path: string;
        label: string;
        hidden: unknown | null;
    }[];
};
