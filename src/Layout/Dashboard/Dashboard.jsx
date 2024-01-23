import { Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="container mx-auto p-5">
            <Outlet />
        </div>
    );
};

export default Dashboard;