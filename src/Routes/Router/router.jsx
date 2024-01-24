import { createBrowserRouter } from "react-router-dom";
import Root from "../../Layout/Root/Root";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import Home from "../../Pages/HomePage/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Dashboard from "../../Layout/Dashboard/Dashboard";
import AddNewHouse from "../../Pages/DashboardPages/HouseOwnerDashboard/AddNewHouse/AddNewHouse";
import MyHouses from "../../Pages/DashboardPages/HouseOwnerDashboard/MyHouses/MyHouses";
import UpdateHouse from "../../Pages/DashboardPages/HouseOwnerDashboard/UpdateHouse/UpdateHouse";

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
            // dashboard
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    // house owner dashboard
                    {
                        path: "addNewHouse",
                        element: <AddNewHouse />
                    },
                    {
                        path: "myHouses",
                        element: <MyHouses />
                    },
                    {
                        path: "updateHouse/:id",
                        element: <UpdateHouse />
                    },
                ]
            }
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
    },
]);

export default router;