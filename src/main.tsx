import { render } from "preact";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./ui/App";

const router = createBrowserRouter([
    { path: "*", element: <App /> }
]);

render(<RouterProvider router={router} />, document.body);
