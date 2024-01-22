import { createBrowserRouter } from "react-router-dom";
import Root from "../../Layout/Root/Root";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import Home from "../../Pages/HomePage/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
    // login route
    {
        path: "/login",
        element: <Login />
    },
    // register route
    {
        path: "/register",
        element: <Register />
    }
]);

export default router;