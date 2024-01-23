import { createContext } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublic";

export const AuthContext = createContext('');

const AuthProvider = ({ children }) => {


    //hooks and custom hooks
    const axiosPublic = useAxiosPublic();


    // track current loggedIn user
    const trackCurrentUser = (userName, userEmail, userRole, userId) => {
        localStorage.setItem('user-name', userName);
        localStorage.setItem('user-email', userEmail);
        localStorage.setItem('user-role', userRole);
        localStorage.setItem('user-id', userId);
        if (userEmail) {
            const userInfo = { email: userEmail };
            axiosPublic.post("/jwt", userInfo)
                .then(res => {
                    const data = res.data;
                    const token = data?.token;
                    if (token) {
                        localStorage.setItem('access-token', token);
                    }
                })
        }
        else {
            localStorage.removeItem('user-name');
            localStorage.removeItem('user-email');
            localStorage.removeItem('user-role');
            localStorage.removeItem('access-token');
            localStorage.removeItem('user-id');
        }
    }





    const authInfo = { trackCurrentUser }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;