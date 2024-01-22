import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useState } from "react";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdHome } from "react-icons/md";
import { FaUpload } from "react-icons/fa";


const Register = () => {

    // hooks and custom hooks
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];








    // show-hide password functionality
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };


    // success notify
    const successNotify = () => toast.success('Account creation successful', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });



    // failed notify
    const failedNotify = (errorMessage) => toast.error(`${errorMessage}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
    });






    return (
        <div className="container mx-auto p-5 min-h-[100vh] flex flex-col justify-center items-center relative">

            <div className="space-y-14 flex flex-col justify-center items-center w-full font-heading">
                <h2 className="text-3xl text-main font-bold text-center ">Sign up for free!</h2>

                {/* sign up form */}
                <form onSubmit={handleSignUp} className="flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/3 space-y-7 lg:space-y-10 px-10 ">

                    {/* name input */}
                    <input type="text" name="name" placeholder="Full name" id="name" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />

                    {/* email input */}
                    <input required type="email" name="email" placeholder="Email address" id="eamil" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />

                    {/* username input */}
                    <input required type="text" name="username" placeholder="Username" id="username" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />

                    {/* password input */}
                    <div className="w-full">
                        <div className="flex relative w-full justify-center items-center">
                            <input required type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                            <span onClick={handleShowPassword} className="absolute right-2 text-[gray]"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                        </div>
                        {
                            passwordErrorMessage ? <p className="text-[14px] font-regular text-[#c73c3c]">{passwordErrorMessage}</p> : ''
                        }
                    </div>


                    {/* image file input */}
                    <label
                        htmlFor="image"
                        className="cursor-pointer relative focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full text-[gray] flex justify-start items-center gap-2"
                    >
                        <FaUpload /> {selectedImageName.length > 25 ? selectedImageName.slice(0, 25) + "...." : selectedImageName || "Choose your profile picture"}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={handleImageInput}
                            className="cursor-pointer opacity-0 absolute top-0 left-0 w-full" />
                    </label>


                    {/* submit button */}
                    <input type="submit" value="Sign up" className="bg-main px-4 py-2 rounded text-white font-bold  hover:bg-sub duration-300 w-full" />

                    <ToastContainer closeButton={false} />
                </form>


                {/* back to homepage button */}
                <Link to="/" className="absolute top-0 left-5 flex justify-center items-center gap-2 text-[18px] font-semibold hover:text-main duration-500 hover:scale-105"><MdHome /> Back to Home</Link>


            </div>

            <div className="flex justify-center items-center flex-col font-heading">
                <div className="mt-5 flex justify-center items-center gap-1">
                    <p className="text-center font-semibold ">Already have an account?</p>
                    <Link to="/login" className="font-bold  border-t-2 border-t-[#ffffff00] border-b-2 border-main hover:bg-main hover:text-white px-2 py-1 hover:border-t-2 duration-300">Login</Link>
                </div>
            </div>

        </div>
    );
};

export default Register;