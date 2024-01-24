import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";




const BookHouse = () => {

    const { userName, userEmail, userId } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { id } = useParams();



    // send the data to database
    const handleRentHouse = e => {
        e.preventDefault();
        const form = e.target;


        // get data from the login form

        const renterId = userId;
        const renterName = userName;
        const renterEmail = userEmail;
        const renterPhone = form.renterPhone.value;
        const rentedHouse = id;

        const houseRentData = { renterId, renterEmail, renterName, renterPhone, rentedHouse }

        // send the data to database for validation
        axiosSecure.post("/houseRent", houseRentData)
            .then(res => {
                const data = res.data;
                console.log(data)
                if (data.insertedId) {
                    successNotify();
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



    // success notify
    const successNotify = () => toast.success('Rent successful!', {
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
        <div className="container mx-auto flex flex-col justify-center items-center p-5 h-[100vh]">
            <h2 className="text-5xl text-main font-bold text-center font-heading mt-[-130px]">Rent A House</h2>


            {/* house booking form */}
            {/* sign up form */}
            <form onSubmit={handleRentHouse}
                className="flex flex-col justify-center items-center w-full md:w-3/5 lg:w-1/3 gap-8 px-10 font-body mt-[20px] md:mt-[50px]">


                {/* name input */}
                <div className="w-full flex flex-col justify-center items-start gap-4">
                    <label className="font-medium">Your Name</label>
                    <input readOnly type="text" name="renterName" value={userName} id="renterName" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                </div>

                {/* email input */}
                <div className="w-full flex flex-col justify-center items-start gap-4">
                    <label className="font-medium">Your Email</label>
                    <input readOnly type="email" name="renterEmail" value={userEmail} id="renterEmail" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                </div>

                {/* phone input */}
                <div className="w-full">
                    <label className="font-medium">Your phone <span className='text-[red]'>*</span></label>
                    <div className="flex relative w-full justify-center items-center mt-3">
                        <input required type="tel" name="renterPhone" placeholder="Phone number" id="renterPhone" className="focus:outline-none border-b-[1px] pb-2 border-[lightgray] focus:border-main transition-all duration-500 w-full" />
                    </div>
                </div>

                {/* submit button */}
                <input type="submit" value="Confirm Booking" className="bg-main px-4 py-2 rounded text-white font-semibold hover:bg-sub duration-300 w-full cursor-pointer" />

                <ToastContainer closeButton={false} />
            </form>


        </div>
    );
};

export default BookHouse;