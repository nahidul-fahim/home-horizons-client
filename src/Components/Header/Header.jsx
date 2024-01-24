import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import { useState } from "react";



const websiteLogo = "https://i.ibb.co/hLYqNng/website-Logo.png";



const Header = () => {


    // hooks and custom hooks
    const { trackCurrentUser } = useAuthContext();
    const { userName, userEmail, userRole } = useCurrentUser();
    const [loggedOut, setLoggedOut] = useState(false);


    // logout user
    const logOutUser = () => {
        trackCurrentUser(null, null, null)
        setLoggedOut(!loggedOut);
    }



    // common navMenu
    const commonMenu =
        <>
            <Link to={"/"}>Home</Link>
        </>



    // house owner nav menu
    const houseOwnerMenu =
        <>
            {/* dashboard */}
            {/* <NavLink to="/dashboard"
                className={({ isActive }) => {
                    return isActive ? "active-link-style" : "link-style"
                }}>
                Dashboard
            </NavLink> */}

            {/* My houses */}
            <NavLink to="/dashboard/myHouses"
                className={({ isActive }) => {
                    return isActive ? "active-link-style" : "link-style"
                }}>
                My Houses
            </NavLink>

            {/* Add new house */}
            <NavLink to="/dashboard/addNewHouse"
                className={({ isActive }) => {
                    return isActive ? "active-link-style" : "link-style"
                }}>
                Add New House
            </NavLink>
        </>






    return (
        <div className="navbar container mx-auto p-5 font-heading font-medium bg-white">
            <div className="">

                {/* left side nav */}

                {/* dropdown for smaller device */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <FaBars className="text-2xl" />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow rounded w-52 bg-white text-xl">
                        {commonMenu}
                    </ul>
                </div>

                {/* logo */}
                <a href="/">
                    <img src={websiteLogo} alt="" className="w-[70%] md:w-[90%]" />
                </a>
            </div>

            {/* right side nav */}
            <div className="navbar-end flex-1 justify-end items-center gap-5 text-xl font-semibold">

                {/* common nav menu */}
                <div className="hidden lg:flex">
                    {commonMenu}
                </div>

                {/* conditional dropdown or login button for user */}

                {
                    userEmail ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button">
                                <FaUserCircle className="text-5xl text-main" />
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow-[0_0_50px_-1px_#cccccc] menu menu-sm dropdown-content rounded w-52 flex flex-col justify-start items-start gap-4 bg-white">
                                <div className="flex flex-col gap-1 justify-center items-center w-full mb-3 bg-[#e0e0e0] py-2 rounded">
                                    <p className="text-[16px] text-black font-body text-center">{userName}</p>
                                    <p className="text-[13px] capitalize text-gray font-body text-center">{userRole}</p>
                                </div>
                                {houseOwnerMenu}
                                <button onClick={logOutUser}
                                    className="bg-black w-full text-white px-3 py-2 font-body font-semibold text-[16px] rounded hover:bg-sub duration-500">Log Out</button>
                            </ul>
                        </div>
                        :
                        <Link to={"/login"} className="bg-black text-white px-5 py-2 font-body font-medium text-[18px] rounded hover:bg-sub duration-500">Login</Link>
                }

            </div>
        </div>
    );
};

export default Header;