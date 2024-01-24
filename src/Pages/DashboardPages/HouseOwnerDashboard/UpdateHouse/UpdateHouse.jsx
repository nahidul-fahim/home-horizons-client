import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic/useAxiosPublic';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingAnimation from '../../../../Components/Shared/LoadingAnimation/LoadingAnimation';


const UpdateHouse = () => {


    // city name of Bangladesh
    const cities = [
        "Select city", "Barisal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur", "Chapainawabganj",
        "Chattogram", "Comilla", "Cox's Bazar", "Dhaka", "Dinajpur", "Faridpur",
        "Feni", "Gaibandha", "Gazipur", "Jamalpur", "Jessore", "Jhalokathi",
        "Joypurhat", "Khulna", "Kishoreganj", "Kushtia", "Lakshmipur",
        "Magura", "Manikganj", "Moulvibazar", "Mymensingh", "Narayanganj",
        "Natore", "Nawabganj", "Narsingdi", "Netrakona", "Noakhali", "Pabna",
        "Patuakhali", "Rajshahi", "Rangpur", "Sherpur", "Sirajganj",
        "Sylhet", "Satkhira", "Tangail", "Thakurgaon"
    ];


    // hooks and custom Hooks
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];


    // fetch single house data
    const { isPending: singleHousePending, data: singleHouse } = useQuery({
        queryKey: ["single-house", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleHouse/${id}`)
            return res.data;
        }
    })

    if (singleHousePending) {
        return <LoadingAnimation />
    }



    // get the current data
    const {
        availabilityDate,
        bathRooms,
        bedRooms,
        cityName,
        houseAddress,
        houseDescription,
        houseName,
        ownerPhone,
        rentPerMonth,
        roomSize,
    } = singleHouse;



    // handle update house
    const handleUpdateHouse = e => {
        e.preventDefault();
        const form = e.target;

        const availabilityDate = form.availabilityDate.value;
        const bathRooms = parseInt(form.bathRooms.value);
        const bedRooms = parseInt(form.bedRooms.value);
        const cityName = form.cityName.value;
        const houseAddress = form.houseAddress.value;
        const houseDescription = form.houseDescription.value;
        const houseName = form.houseName.value;
        const ownerPhone = form.ownerPhone.value;
        const rentPerMonth = parseInt(form.rentPerMonth.value);
        const roomSize = form.roomSize.value;


        // regular expression for phone
        const phoneRegExPattern = /^\+880\d{10}$/;
        setPhoneErrorMessage();

        // phone validation
        if (!phoneRegExPattern.test(ownerPhone)) {
            setPhoneErrorMessage("Must start with +880 and contain 13 digits");
            return;
        }


        //getting the form info into an object
        const udatedHouseData = {
            houseName,
            cityName,
            houseAddress,
            bedRooms,
            bathRooms,
            roomSize,
            rentPerMonth,
            availabilityDate,
            ownerPhone,
            houseDescription,
        }

        // Send the data to the server and database
        axiosSecure.put(`/updateHouse/${id}`, udatedHouseData)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    successNotify();
                }
            })
            // db product posting failure
            .catch(err => {
                failureNotify(err.code)
            })
    }








// Successful product adding message
const successNotify = () => toast.success('Updated successfully!', {
    position: "top-center",
    autoClose: 1800,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    transition: Flip,
});


// Failed product adding message
const failureNotify = (errorMessage) => toast.error(`${errorMessage}`, {
    position: "top-center",
    autoClose: 1800,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    transition: Flip,
});






return (
    <div className="flex flex-col justify-start items-center gap-5">
        <h2 className="mt-5 font-heading text-center text-5xl md:text-6xl font-bold text-main">Update House</h2>

        {/* new house adding form */}
        <form onSubmit={handleUpdateHouse}
            className="flex flex-col font-body justify-center items-center gap-10 mt-[10px] md:mt-[20px] lg:mt-[40px] text-[18px] font-medium w-full lg:w-[90%]">

            {/* house name, city name */}
            <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>

                {/* house name */}
                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/2'>
                    <label>Enter house name <span className='text-[red]'>*</span></label>
                    <input type="text" id='houseName' name='houseName' defaultValue={houseName} className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                </div>

                {/* house city */}
                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/2'>
                    <label>Enter city name <span className='text-[red]'>*</span></label>
                    <select required id='cityName' name='cityName' defaultValue={cityName} className='w-full border-[1px] border-[#b3b3b3] text-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
                        {
                            cities.map((city, index) =>
                                <option key={index} value={city} className='capitalize'>{city}</option>)
                        }
                    </select>
                </div>

            </div>

            {/* house address */}
            <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                <label>Enter house address <span className='text-[red]'>*</span></label>
                <input required type="text" id='houseAddress' name='houseAddress' defaultValue={houseAddress} className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
            </div>


            {/* bedrooms, bathrooms, room size */}
            <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                {/* bedrooms */}
                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                    <label>Number of bedrooms <span className='text-[red]'>*</span></label>
                    <input required type="number" id='bedRooms' name='bedRooms' min="1" step="1" defaultValue={bedRooms} className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                </div>

                {/* bathrooms */}
                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                    <label>Number of bathrooms <span className='text-[red]'>*</span></label>
                    <input required type="number" id='bathRooms' name='bathRooms' min="1" step="1" defaultValue={bathRooms} className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                </div>

                {/* room size */}
                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                    <label>Enter room size <span className='text-[red]'>*</span></label>
                    <input required type="text" id='roomSize' name='roomSize' defaultValue={roomSize} className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                </div>

            </div>


            {/* Rent, availability date, phone number */}
            <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                {/* rent */}
                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                    <label>Enter rent per month (Taka) <span className='text-[red]'>*</span></label>
                    <input required type="number" id='rentPerMonth' name='rentPerMonth' min="1000" step="1" defaultValue={rentPerMonth} className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                </div>

                {/* availability date */}
                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                    <label>Available from <span className='text-[red]'>*</span></label>
                    <input required type="date" min={todayDate} defaultValue={availabilityDate} id='availabilityDate' name='availabilityDate' className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                </div>

                {/* phone number  */}
                <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                    <label>Enter your phone number <span className='text-[red]'>*</span></label>
                    <div className="flex relative w-full justify-center items-center">
                        <input required type="tel" name="ownerPhone" defaultValue={ownerPhone} id="ownerPhone" className="w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain" />
                    </div>
                    {
                        phoneErrorMessage ? <p className="text-[14px] font-semibold text-[#ce0f0f]">{phoneErrorMessage}</p> : ''
                    }
                </div>
            </div>



            {/* house description */}
            <div className='w-full flex justify-center items-center gap-8'>
                <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                    <label>Enter house description <span className='text-[red]'>*</span></label>
                    <textarea required id='houseDescription' name='houseDescription' defaultValue={houseDescription} className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                </div>
            </div>


            {/* house image select */}
            {/* <div className='w-full flex justify-center items-center gap-8'>
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>

                        <label
                            htmlFor="image"
                            className="cursor-pointer relative focus:outline-none border-[1px] py-2 px-4 border-[#b3b3b3] text-lightBlack focus:border-lightMain transition-all duration-500 w-full flex justify-center items-center gap-2"
                        >
                            <FaUpload /> {selectedImageName.length > 25 ? selectedImageName.slice(0, 25) + "..." : selectedImageName || "Choose house image"}
                            <input
                                required
                                type="file"
                                name="houseImage"
                                id="houseImage"
                                accept="image/*"
                                onChange={handleImageInput}
                                className="cursor-pointer opacity-0 absolute top-0 left-0 w-full" />
                        </label>
                    </div>
                </div> */}


            {/* submit button */}
            <input type="submit" value="Update the house" className="w-full lg:w-2/3 px-5 py-3 bg-black mt-5 rounded-md text-white hover:bg-sub duration-300  font-semibold text-xl  cursor-pointer" />

        </form>

        <ToastContainer closeButton={false} />


    </div>
);
};

export default UpdateHouse;