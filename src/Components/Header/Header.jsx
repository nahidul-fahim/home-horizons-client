import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";



const websiteLogo = "https://i.ibb.co/hLYqNng/website-Logo.png";



const Header = () => {







    /* 
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    */




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
                <div className="dropdown dropdown-end text-xl font-semibold">
                    <div tabIndex={0} role="button">
                        <FaUserCircle className="text-5xl text-main" />
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow menu menu-sm dropdown-content rounded w-52 text-xl space-y-3 font-semibold">
                        <a>Settings</a>
                        <a>Logout</a>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;