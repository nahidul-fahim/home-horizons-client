import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";


// image hosting (imgBB) key and url
const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`


const AddNewHouse = () => {

    // hooks and custom Hooks
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
    const [selectedImageName, setSelectedImageName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const addingForm = useRef(null);
    const { userName, userEmail, userId } = useCurrentUser();

    // city name of Bangladesh
    const cities = [
        "Select city", "Barisal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur", "Chapainawabganj",
        "Chattogram", "Comilla", "Cox's Bazar", "Dhaka", "Dinajpur", "Faridpur",
        "Feni", "Gaibandha", "Gazipur", "Jamalpur", "Jessore", "Jhalokathi",
        "Joypurhat", "Khulna", "Kishoreganj", "Kushtia", "Lakshmipur",
        "Magura", "Manikganj", "Moulvibazar", "Mymensingh", "Narayanganj",
        "Natore", "Nawabganj", "Narsingdi", "Netrakona", "Noakhali", "Pabna",
        "Patuakhali", "Rajshahi", "Rangpur", "Sherpur", "Sirajganj",
        "Sylhet", "Satkhira", "Tangail", "Thakurgaon",
    ];




    // image input and get the file name
    const handleImageInput = e => {
        e.preventDefault();
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            const file = { image: fileInput.files[0] }
            const fileName = fileInput.files[0].name;
            setSelectedImageName(fileName);
            setSelectedImage(file)
        }
        else {
            setSelectedImageName('')
        }
    }


    // get todays date
    const todayDate = new Date().toISOString().split('T')[0];



    // handle old car product upload for sale by user
    const handleAddNewHouse = e => {
        e.preventDefault();
        const form = e.target;

        const ownerPhone = form.ownerPhone.value;
        // regular expression for phone
        const phoneRegExPattern = /^\+880\d{10}$/;
        setPhoneErrorMessage();

        // phone validation
        if (!phoneRegExPattern.test(ownerPhone)) {
            setPhoneErrorMessage("Must start with +880 and contain 13 digits");
            return;
        }


        // if selected image file is available, upload the image to imgBb
        if (selectedImage) {
            axiosPublic.post(imgUploadUrl, selectedImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(res => {
                    // if the image is uploaded successfully proceed further
                    const data = res.data;
                    if (data) {
                        const houseName = form.houseName.value;
                        const cityName = form.cityName.value;
                        const houseAddress = form.houseAddress.value;
                        const bedRooms = parseInt(form.bedRooms.value);
                        const bathRooms = parseInt(form.bathRooms.value);
                        const roomSize = form.roomSize.value;
                        const rentPerMonth = parseInt(form.rentPerMonth.value);
                        const availabilityDate = form.availabilityDate.value;
                        const ownerPhone = form.ownerPhone.value;
                        const houseDescription = form.houseDescription.value;
                        const houseImage = res.data.data.display_url;
                        const addingDate = todayDate;

                        const houseOwnerName = userName;
                        const houseOwnerEmail = userEmail;
                        const houseOwnerId = userId;


                        //getting the form info into an object
                        const newHouseData = {
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
                            houseImage,
                            addingDate,
                            houseOwnerName,
                            houseOwnerEmail,
                            houseOwnerId,
                        }

                        // Send the data to the server and database
                        axiosSecure.post("/newHouse", newHouseData)
                            .then(res => {
                                const data = res.data;
                                if (data.insertedId) {
                                    successNotify();
                                    addingForm.current.reset();
                                }
                            })
                            // db product posting failure
                            .catch(err => {
                                failureNotify(err.code)
                            })
                    }
                })
                // imgBb file upload error
                .catch(err => failureNotify(err.code))
        }
    }




    // Successful product adding message
    const successNotify = () => toast.success('New house added successfully!', {
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
            <h2 className="mt-5 font-heading text-center text-5xl md:text-6xl font-bold text-main">Add New House</h2>

            {/* new house adding form */}
            <form onSubmit={handleAddNewHouse} ref={addingForm}
                className="flex flex-col font-body justify-center items-center gap-10 mt-[10px] md:mt-[20px] lg:mt-[40px] text-[18px] font-medium w-full lg:w-[90%]">

                {/* house name, city name */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>

                    {/* house name */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/2'>
                        <label>Enter house name <span className='text-[red]'>*</span></label>
                        <input required type="text" id='houseName' name='houseName' placeholder='House name' className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                    {/* house city */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/2'>
                        <label>Enter city name <span className='text-[red]'>*</span></label>
                        <select required id='cityName' name='cityName' className='w-full border-[1px] border-[#b3b3b3] text-gray px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain'>
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
                    <input required type="text" id='houseAddress' name='houseAddress' placeholder='House address' className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                </div>


                {/* bedrooms, bathrooms, room size */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                    {/* bedrooms */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Number of bedrooms <span className='text-[red]'>*</span></label>
                        <input required type="number" id='bedRooms' name='bedRooms' min="1" step="1" placeholder='Number of bedrooms' className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                    {/* bathrooms */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Number of bathrooms <span className='text-[red]'>*</span></label>
                        <input required type="number" id='bathRooms' name='bathRooms' min="1" step="1" placeholder='Number of bathrooms' className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                    {/* room size */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Enter room size <span className='text-[red]'>*</span></label>
                        <input required type="text" id='roomSize' name='roomSize' placeholder='Room size' className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                </div>


                {/* Rent, availability date, phone number */}
                <div className='w-full flex flex-col lg:flex-row justify-center items-center gap-8'>
                    {/* rent */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Enter rent per month (Taka) <span className='text-[red]'>*</span></label>
                        <input required type="number" id='rentPerMonth' name='rentPerMonth' min="1000" step="1" placeholder='Rent per month' className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                    {/* availability date */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Available from <span className='text-[red]'>*</span></label>
                        <input required type="date" min={todayDate} id='availabilityDate' name='availabilityDate' className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>

                    {/* phone number  */}
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full lg:w-1/3'>
                        <label>Enter your phone number <span className='text-[red]'>*</span></label>
                        <div className="flex relative w-full justify-center items-center">
                            <input required type="tel" name="ownerPhone" placeholder="Phone number" id="ownerPhone" className="w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain" />
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
                        <textarea required id='houseDescription' name='houseDescription' placeholder='House description' className='w-full border-[1px] border-[#b3b3b3] px-4 py-2 rounded-[3px] focus:outline-none focus:border-lightMain' />
                    </div>
                </div>


                {/* house image select */}
                <div className='w-full flex justify-center items-center gap-8'>
                    <div className='font-body flex flex-col justify-start items-start gap-3 w-full'>
                        {/* image file input */}
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
                </div>


                {/* submit button */}
                <input type="submit" value="Add the house" className="w-full lg:w-2/3 px-5 py-3 bg-black mt-5 rounded-md text-white hover:bg-sub duration-300  font-semibold text-xl  cursor-pointer" />

            </form>

            <ToastContainer closeButton={false} />


        </div>
    );
};

export default AddNewHouse;