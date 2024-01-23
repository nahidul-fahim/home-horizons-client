import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const useAuthContext = () => {

    const info = useContext(AuthContext)

    return info;
};

export default useAuthContext;