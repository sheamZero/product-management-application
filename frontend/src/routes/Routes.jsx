
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/products",
                element: <Products />
            },
        ]
    }
]);

export default router;