

const useCurrentUser = () => {

    // getting the data of current user
    const userName = localStorage.getItem('user-name')
    const userEmail = localStorage.getItem('user-email')
    const userRole = localStorage.getItem('user-role')

    const currentUser = { userName, userEmail, userRole }

    return currentUser;
};

export default useCurrentUser;