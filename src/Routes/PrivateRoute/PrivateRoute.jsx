import { Navigate, useLocation } from 'react-router-dom';
import useCurrentUser from '../../Hooks/useCurrentUser/useCurrentUser';




const PrivateRoute = ({ children }) => {


    const { userEmail } = useCurrentUser();
    const location = useLocation();


    if (userEmail) {
        return children;
    }

    return (<Navigate state={location.pathname} to="/login"></Navigate>
    );
};

export default PrivateRoute;