import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import { useState } from "react";



const websiteLogo = "https://i.ibb.co/hLYqNng/website-Logo.png";



const Header = () => {


    // hooks and custom hooks
    const { trackCurrentUser } = useAuthContext();
    const { userEmail } = useCurrentUser();
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






    return (
        <div className="navbar font-heading font-medium bg-white">
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
                {commonMenu}

                {/* conditional dropdown or login button for user */}

                {
                    userEmail ?
                        <div className="dropdown dropdown-end text-xl font-semibold">
                            <div tabIndex={0} role="button">
                                <FaUserCircle className="text-5xl text-main" />
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow menu menu-sm dropdown-content rounded w-52 text-xl space-y-3 font-semibold">
                                <a>Settings</a>
                                <button onClick={logOutUser}
                                    className="bg-black text-white px-3 py-1 font-body font-medium text-[18px] rounded hover:bg-sub duration-500">Log Out</button>
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