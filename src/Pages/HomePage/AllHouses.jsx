import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import LoadingAnimation from "../../Components/Shared/LoadingAnimation/LoadingAnimation";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";

const AllHouses = () => {


    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { userId } = useCurrentUser();


    // fetch user booking data
    const { isPending: userBookingsPending, data: userBookings } = useQuery({
        queryKey: ["user-bookings", userId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userBookings/${userId}`)
            return res.data;
        }
    })


    // fetch data
    const { isPending: allHousePending, data: allHouse } = useQuery({
        queryKey: ["all-house"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allHouse")
            return res.data;
        }
    })


    if (allHousePending || userBookingsPending) {
        return <LoadingAnimation />
    }





    return (
        <div className="mt-[50px] md:mt-[80px]">
            <h2 className="text-4xl md:text-5xl font-medium text-main font-heading flex justify-start items-center gap-1 md:gap-3">Best Houses For You <span className="text-sub"><FaLongArrowAltRight /></span> </h2>

            {/* display all house */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] justify-center items-center mt-[20px] md:mt-[50px]">
                {
                    allHouse.map(house =>
                        <div key={house?._id}>
                            <img src={house?.houseImage} alt="" />
                            <div className="flex justify-between items-center gap-3 font-body text-[14px] mt-2 relative">
                                <p className="bg-white text-gray font-medium px-2 py-1 rounded absolute bottom-[84px] left-2">{house?.bedRooms} bedrooms</p>
                                <p className="bg-white text-gray font-medium  px-2 py-1 rounded absolute bottom-[48px] left-2">{house?.bathRooms} bathrooms</p>
                                <p className="bg-white text-gray font-medium px-2 py-1 rounded absolute bottom-3 left-2">{house?.roomSize} sq. feet</p>
                            </div>

                            <div className="w-full mt-3 flex flex-col gap-2 justify-start items-start font-body">
                                <h3 className="font-body text-xl font-semibold text-black">{house?.houseName}</h3>
                                <p className="text-gray">{house?.houseDescription.slice(0, 100)}</p>
                                <div className="w-full flex justify-between items-center">
                                    <p className="text-[18px] font-semibold text-gray">{house?.rentPerMonth} Tk/month</p>
                                    {
                                        userBookings.length >= 2 ?
                                            <button className="bg-gray cursor-not-allowed px-3 py-1 rounded text-white font-medium flex justify-between items-center gap-2">Book House <FaLongArrowAltRight /></button>
                                            :
                                            <Link to={`/bookHouse/${house?._id}`}><button className="bg-black px-3 py-1 rounded text-white font-medium hover:bg-sub duration-300 flex justify-between items-center gap-2">Book House <FaLongArrowAltRight /></button></Link>
                                    }
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default AllHouses;