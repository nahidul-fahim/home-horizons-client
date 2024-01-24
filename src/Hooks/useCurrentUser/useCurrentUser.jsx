const useCurrentUser = () => {

    // getting the data of current user
    const userName = localStorage.getItem('user-name')
    const userEmail = localStorage.getItem('user-email')
    const userRole = localStorage.getItem('user-role')
    const userId = localStorage.getItem('user-id')

    const currentUser = { userName, userEmail, userRole, userId }

    return currentUser;
};

export default useCurrentUser;