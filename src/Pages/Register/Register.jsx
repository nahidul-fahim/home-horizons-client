import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useRef, useState } from "react";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdHome } from "react-icons/md";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";


const Register = () => {

    // hooks and custom hooks
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const axiosSecure = useAxiosSecure();
    const signUpForm = useRef(null);
    const navigate = useNavigate();


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];



    // sign up functionality
    const handleSignUp = e => {
        e.preventDefault();

        // get the data from form
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;
        const userCreationDate = todayDate;
        const userRole = e.target.userRole.value;

        // regular expression for password and phone
        const passwordRegExPattern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
        const phoneRegExPattern = /^\+880\d{10}$/;
        setPasswordErrorMessage();
        setPhoneErrorMessage();

        // password validation
        if (!passwordRegExPattern.test(password)) {
            setPasswordErrorMessage("Password should be minimum 6 characters, contain at least 1 capital letter & 1 special character");
            return;
        }

        // phone validation
        if (!phoneRegExPattern.test(phone)) {
            setPhoneErrorMessage("Must start with +880 and contain 13 digits");
            return;
        }

        const newUserData = { name, email, phone, password, userCreationDate, userRole }

        axiosSecure.post("/newUser", newUserData)
            .then(res => {
                const data = res.data;
                if (data.insertedId) {
                    successNotify();
                    signUpForm.current.reset();
                    navigate('/login');
                }
                else {
                    failedNotify(data.message)
                }
            })
            .catch(err => {
                failedNotify(err.code)
            })
    };



    // show-hide password functionality
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    };


    // success notify
    const successNotify = () => toast.success('User created successfully', {
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
                <h2 className="text-5xl text-main font-bold text-center ">Sign up for free!</h2>

                {/* sign up form */}
                <form onSubmit={handleSignUp} ref={signUpForm} className="flex flex-col justify-center items-center w-full md:w-2/3 lg:w-1/3 gap-8 px-10 font-body">

                    {/* name input */}
                    <div className="w-full flex flex-col justify-center items-start gap-4">
                        <label className="font-medium">Your Name <span className='text-[red]'>*</span></label>
                        <input required type="text" name="name" placeholder="Full name" id="name" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                    </div>

                    {/* email input */}
                    <div className="w-full flex flex-col justify-center items-start gap-4">
                        <label className="font-medium">Your Email <span className='text-[red]'>*</span></label>
                        <input required type="email" name="email" placeholder="Email address" id="email" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                    </div>


                    {/* phone input */}
                    <div className="w-full">
                        <label className="font-medium">Your Phone <span className='text-[red]'>*</span></label>
                        <div className="flex relative w-full justify-center items-center mt-3">
                            <input required type="tel" name="phone" placeholder="Phone number" id="phone" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                        </div>
                        {
                            phoneErrorMessage ? <p className="text-[14px] font-semibold text-[#ce0f0f]">{phoneErrorMessage}</p> : ''
                        }
                    </div>



                    {/* role select */}
                    <div className="w-full flex flex-col justify-center items-start gap-4">
                        <label className="font-medium">Select your role <span className='text-[red]'>*</span></label>
                        <select required id='userRole' defaultValue={"Choose your role"} name='userRole' className='w-full border-b-[1px] border-[lightgray] py-2 rounded-[3px] focus:outline-none text-gray focus:border-lightMain'>
                            <option disabled>Choose your role</option>
                            <option value="house owner">House Owner</option>
                            <option value="house renter">House Renter</option>
                        </select>
                    </div>

                    {/* password input */}
                    <div className="w-full">
                        <label className="font-medium">Your password <span className='text-[red]'>*</span></label>
                        <div className="flex relative w-full justify-center items-center mt-3">
                            <input required type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                            <span onClick={handleShowPassword} className="absolute right-2 text-[gray]"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                        </div>
                        {
                            passwordErrorMessage ? <p className="text-[14px] font-semibold text-[#ce0f0f]">{passwordErrorMessage}</p> : ''
                        }
                    </div>

                    {/* submit button */}
                    <input type="submit" value="Register" className="bg-main px-4 py-2 rounded text-white font-semibold hover:bg-sub duration-300 w-full cursor-pointer" />

                    <ToastContainer closeButton={false} />
                </form>


                {/* back to homepage button */}
                <Link to="/" className="absolute top-[-30px] md:top-0 left-5 flex justify-center items-center gap-2 text-xl text-gray font-semibold hover:text-black duration-500"><MdHome /> Back to Home</Link>
            </div>

            <div className="flex justify-center items-center flex-col font-body">
                <div className="mt-5 flex justify-center items-center gap-1">
                    <p className="text-center font-medium ">Already have an account?</p>
                    <Link to="/login" className="font-bold  border-t-2 border-t-[#ffffff00] border-b-2 border-sub hover:bg-main hover:text-white px-2 py-1 hover:border-t-2 duration-300">Login</Link>
                </div>
            </div>

        </div>
    );
};

export default Register;