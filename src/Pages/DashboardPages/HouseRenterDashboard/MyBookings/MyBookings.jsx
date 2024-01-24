import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";


const MyBookings = () => {


    const axiosSecure = useAxiosSecure();
    const { userId } = useCurrentUser();


    // fetch data
    const { isPending, data, refetch } = useQuery({
        queryKey: ["my-bookings", userId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userBookings/${userId}`)
            return res.data;
        }
    })


    if (isPending) {
        return <LoadingAnimation />
    }


    // handle delete
    const handleDelete = id => {
        axiosSecure.delete(`/deleteBooking/${id}`)
            .then(res => {
                const data = res.data;
                if (data.deletedCount > 0) {
                    refetch();
                }
            })
            .catch(() => {
                //
            })
    }



    return (
        <div className="container mx-auto flex flex-col justify-center items-center gap-5">
            <h2 className="text-5xl text-main font-bold text-center font-heading mt-5">My Bookings</h2>


            {/* show bookings */}
            <div className="mt-[20px] md:mt-[50px] grid grid-cols-1 md:grid-cols-2 gap-[30px] lg:gap-[40px] justify-center items-center">
                {
                    data.map(singleHouse =>
                        <div key={singleHouse?._id}>
                            <img src={singleHouse?.houseImage} alt="" />

                            <div className="w-full mt-3 flex flex-col gap-2 justify-start items-start font-body">
                                <h3 className="font-body text-xl font-semibold text-black">{singleHouse?.houseName}</h3>
                                <p className="text-gray">{singleHouse?.houseDescription.slice(0, 100)}</p>
                                <div className="w-full flex justify-between items-center">
                                    <p className="text-[18px] font-semibold text-gray">{singleHouse?.rentPerMonth} Tk/month</p>
                                    <button onClick={() => handleDelete(singleHouse?._id)}
                                        className="bg-[#aa0707] text-white px-3 py-1 rounded font-medium hover:bg-black duration-300">Delete Booking</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default MyBookings;