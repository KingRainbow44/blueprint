import { render } from "preact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "@ui/App.tsx";

import Logger from "@backend/logger";

/**
 * Method used to determine if the current page is a Canvas instance.
 * Taken from: https://github.com/jtcheng26/canvas-task-extension/blob/main/src/pages/Content/index.ts
 */
const isCanvas = document.getElementById("application")
    ?.classList.contains("ic-app");

// Define the browser router.
const router = createBrowserRouter([
    { path: "*", element: <App /> }
]);

if (isCanvas) {
    const startTime = Date.now();

    // Inject the logger.
    Logger.override();

    // Remove all existing content.
    document.body.innerHTML = "";

    // Replace the title.
    document.title = "Blueprint";
    // Replace the favicon.
    document.querySelector("link[type='image/x-icon']")
        ?.setAttribute("href", "https://i.imgur.com/fsDKkUI.png");

    // Render the page.
    render(<RouterProvider router={router} />, document.body);

    // Log the end time.
    Logger.log(`Finished in ${Date.now() - startTime}ms.`);
}

export default router;
