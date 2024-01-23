import { MdHome } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";



const Login = () => {


    // hooks and custom hooks
    const [showPassword, setShowPassword] = useState(false);
    const axiosSecure = useAxiosSecure();
    const loginForm = useRef(null);
    const { trackCurrentUser } = useAuthContext();
    const navigate = useNavigate();


    // handle user login
    const handleLogIn = e => {
        e.preventDefault();

        // get data from the login form
        const email = e.target.email.value;
        const password = e.target.password.value;

        const loginData = { email, password }

        // send the data to database for validation
        axiosSecure.post("/loginUser", loginData)
            .then(res => {
                const data = res.data;
                if (data.login) {
                    successNotify();
                    loginForm.current.reset();
                    const loggedInData = data.loggedInUserData;
                    trackCurrentUser(loggedInData?.userName, loggedInData?.userEmail, loggedInData?.userRole)
                    navigate("/")
                }
                else {
                    failedNotify(data.message)
                }
            })
            .catch(err => {
                failedNotify(err.code);
            })
    }


    // show-hide password functionality
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };


    // success notify
    const successNotify = () => toast.success('Logged in successfully', {
        position: "bottom-right",
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
        position: "bottom-right",
        autoClose: 2500,
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

            <div className="space-y-14 flex flex-col justify-center items-center w-full font-heading mt-12 md:mt-5">
                <h2 className="text-5xl text-main font-bold text-center ">Login here</h2>

                {/* sign up form */}
                <form onSubmit={handleLogIn} ref={loginForm} className="flex flex-col justify-center items-center w-full md:w-3/5 lg:w-1/3 gap-8 px-10 font-body">


                    {/* email input */}
                    <div className="w-full flex flex-col justify-center items-start gap-4">
                        <label className="font-medium">Your Email <span className='text-[red]'>*</span></label>
                        <input required type="email" name="email" placeholder="Email address" id="email" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                    </div>


                    {/* password input */}
                    <div className="w-full">
                        <label className="font-medium">Your password <span className='text-[red]'>*</span></label>
                        <div className="flex relative w-full justify-center items-center mt-3">
                            <input required type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                            <span onClick={handleShowPassword} className="absolute right-2 text-[gray]"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                        </div>
                    </div>

                    {/* submit button */}
                    <input type="submit" value="Login" className="bg-main px-4 py-2 rounded text-white font-semibold hover:bg-sub duration-300 w-full cursor-pointer" />

                    <ToastContainer closeButton={false} />
                </form>


                {/* back to homepage button */}
                <Link to="/" className="absolute top-[-30px] md:top-0 left-5 flex justify-center items-center gap-2 text-xl text-gray font-semibold hover:text-black duration-500"><MdHome /> Back to Home</Link>
            </div>

            {/* Toggle to register page */}
            <div className="flex justify-center items-center flex-col font-body">
                <div className="mt-5 flex justify-center items-center gap-1">
                    <p className="text-center font-medium ">{'Don\'t'} have an account?</p>
                    <Link to="/register" className="font-bold  border-t-2 border-t-[#ffffff00] border-b-2 border-sub hover:bg-main hover:text-white px-2 py-1 hover:border-t-2 duration-300">Register</Link>
                </div>
            </div>

        </div>
    );
};

export default Login;