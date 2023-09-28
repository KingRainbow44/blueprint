/*
 * Notes about the Canvas API:
 * - Authentication is done using the browser's cookies.
 * - The API is documented in the Canvas GitHub repository:
 *   https://github.com/instructure/canvas-lms
 */

// This holds the backings for the UI to access.
// All information here is cached.
import Dashboard from "@ui/Dashboard.tsx";

export default class Canvas {
    /**
     * Fetches a resource from the Canvas API.
     * Uses the cache if possible.
     *
     * @param resource The resource to fetch.
     * @param fetcher The function to fetch the resource.
     * @private
     */
    private static async fetch<T>(
        resource: string, fetcher: () => Promise<T>
    ) {
        // Check if the resource is cached.
        const data = localStorage.getItem(resource);
        if (data) {
            const parsed = JSON.parse(data) as { _ttl: number; };

            // Check if the resource is expired.
            if (parsed._ttl > Date.now()) {
                delete parsed._ttl;
                return parsed as T;
            }
        }

        // Fetch the resource.
        const fetched = await fetcher();
        // Cache the resource.
        localStorage.setItem(resource, JSON.stringify({
            _ttl: Date.now() + 1000 * 60 * 60 * 24, // 1 day
            ...fetched
        }));

        return fetched;
    }

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
    }): Promise<Course[] | DashboardCard[]> {
        const courses = options?.dash ?
            await Canvas.fetch("dashCards", () => API.getDashboardCards()) :
            await Canvas.fetch("courses", () => API.getCourses(options?.as));

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
    public static async getCourse(id: number): Promise<Course | undefined> {
        return (await Canvas.getCourses()).find(course => course.id == id);
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
     */
    public static async getCourses(as?: Enrollment): Promise<Course[]> {
        let route = "/courses?";
        if (as) {
            route += `enrollment_type=${as || ""}&`;
        }

        const response = await API.call(route);
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

// https://canvas.instructure.com/doc/api/courses.html#Course
export type Course = {
    id: number;
    uuid: string;
    name: string;
    course_code: string;
    original_name: string;
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
