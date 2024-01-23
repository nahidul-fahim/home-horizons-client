import { createContext } from "react";

export const AuthContext = createContext('');

const AuthProvider = ({ children }) => {


    // track current loggedIn user
    const trackCurrentUser = (userName, userEmail, userRole) => {
        console.log(userName, userEmail, userRole);
    }





    const authInfo = {trackCurrentUser}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;