import axios from "axios";

// create axios instance
const axiosPublic = axios.create({
    baseURL: 'https://horizon-homes-server.vercel.app'
    // baseURL: 'http://localhost:5000'
})


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;