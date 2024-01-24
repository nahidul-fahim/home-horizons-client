import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";


const MyBookings = () => {


    const axiosSecure = useAxiosSecure();
    const { userName, userEmail, userRole, userId } = useCurrentUser();


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

    console.log(data)




    return (
        <div className="container mx-auto flex flex-col justify-center items-center gap-5">
            <h2 className="text-5xl text-main font-bold text-center font-heading mt-5">My Bookings</h2>
        </div>
    );
};

export default MyBookings;