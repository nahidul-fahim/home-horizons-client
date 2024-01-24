import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic/useAxiosPublic";
import useCurrentUser from "../../../../Hooks/useCurrentUser/useCurrentUser";
import LoadingAnimation from "../../../../Components/Shared/LoadingAnimation/LoadingAnimation";
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useMemo } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure/useAxiosSecure";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";



const MyHouses = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { userId } = useCurrentUser();


    // fetch data using tanStack
    const { isPending: ownerHousePending, data: ownerHousesList, refetch: ownerHouseRefetch } = useQuery({
        queryKey: ["owner-listing"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/houseOwnerHouses/${userId}`)
            return res.data;
        }
    })


    // delete a house
    const handleDeleteHouse = id => {
        axiosSecure.delete(`/deleteHouse/${id}`)
            .then(res => {
                const data = res.data;
                console.log(data)
                if (data.deletedCount) {
                    successNotify("Deleted successfully!")
                    ownerHouseRefetch();
                }
            })
            .catch(err => {
                failedNotify(err.code)
            })
    }


    // success notify
    const successNotify = (successMessage) => toast.success(`${successMessage}`, {
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






    // react table
    const columns = [
        {
            accessorKey: "",
            header: "#",
            cell: row => <p>{row.row.index + 1}</p>
        },
        {
            accessorKey: "houseImage",
            header: "House",
            cell: row => <div className="flex justify-center items-center">
                <img src={row.row.original.houseImage} alt="product image" className="w-[120px] h-[70px] rounded" />
            </div>
        },
        {
            accessorKey: "houseName",
            header: "House name"
        },
        {
            accessorKey: "cityName",
            header: "City name"
        },
        {
            accessorKey: "roomSize",
            header: "Room size"
        },
        {
            accessorKey: "availabilityDate",
            header: "Available from"
        },
        {
            accessorKey: "rentPerMonth",
            header: "Rent",
            cell: row => <div className="flex w-full justify-center items-center">
                <p className="font-medium text-[#545454] text-center">{row.row.original.rentPerMonth} Tk</p>
            </div>
        },
        {
            accessorKey: "rentStatus",
            header: "Rent status",
            cell: row => <div className="flex w-full justify-center items-center">
                <p className="font-medium text-[#545454] text-center">{row.row.original.rentStatus}</p>
            </div>
        },
        {
            accessorKey: "",
            header: "Edit",
            cell: row => <div className="flex w-full justify-center items-center">
                <Link to={`/dashboard/updateHouse/${row.row.original._id}`}><button className="bg-main px-3 py-1 rounded text-white font-body hover:bg-sub duration-300 font-medium">Edit</button></Link>
            </div>
        },
        {
            accessorKey: "",
            header: "Delete",
            cell: row => <div className="flex w-full justify-center items-center">
                <button onClick={() => handleDeleteHouse(row.row.original._id)}
                    className="bg-[#bb0808] px-3 py-1 rounded text-white font-body hover:bg-black duration-300 font-medium">Delete</button>
            </div>
        },
    ]


    // get the data
    const data = useMemo(() => ownerHousesList ?? [], [ownerHousesList]);



    // tanStack table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })



    if (ownerHousePending) {
        return <LoadingAnimation />
    }


    return (
        <div className="flex flex-col justify-start items-center gap-5">
            <h2 className="mt-5 font-heading text-center text-5xl md:text-6xl font-bold text-main">My Houses</h2>

            {
                ownerHousesList.length !== 0 ?
                    <>
                        {/* table to show all the products */}
                        <div className="w-full mt-5 p-5">
                            <table className="w-full font-body">
                                <thead>
                                    {
                                        table.getHeaderGroups().map((headerGroup, index) =>
                                            <tr key={index} className="table-row">
                                                {headerGroup.headers.map(header =>
                                                    <th key={header?.id} className="table-description text-main">
                                                        {
                                                            flexRender(header.column.columnDef.header, header.getContext())
                                                        }
                                                    </th>)}
                                            </tr>
                                        )}
                                </thead>

                                <tbody>
                                    {
                                        table.getRowModel().rows.map((row, index) =>
                                            <tr key={index} className="table-row">
                                                {
                                                    row.getVisibleCells().map((cell, index) =>
                                                        <td key={index} className="text-center table-description font-medium">
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </td>)
                                                }
                                            </tr>)
                                    }
                                </tbody>
                            </table>

                            {/* pagination buttons */}
                            <div className="w-full flex justify-between items-center gap-10 mt-5 font-body font-semibold">
                                <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}
                                    className="hover:text-sub duration-300 disabled:text-gray"
                                >Previous</button>
                                <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}
                                    className="hover:text-sub duration-300 disabled:text-gray">Next</button>
                            </div>
                        </div>
                    </>
                    :
                    <p className="text-2xl mt-[250px] font-semibold font-body text-center text-gray">No data found</p>
            }

            <ToastContainer closeButton={false} />


        </div >
    );
};

export default MyHouses;