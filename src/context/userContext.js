import { useContext, useReducer, createContext } from "react";
import UserReducer from "../reducers/userReducer";
import { saveUserData, deleteUserData } from "../actions/userActions";

const UserContext = createContext();

const initialState = {
    user_data: null, 
    isLoggedIn: false
}


const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const signInUser = (data) =>{
        localStorage.setItem('login-token', JSON.stringify(data));
        dispatch(saveUserData(data))
    }
    const logOutUser = (data) =>{
        localStorage.removeItem("login-token");
        dispatch(deleteUserData(data))
    }

    return(
        <UserContext.Provider value={
            {...state, signInUser, logOutUser}
        }>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}

export {
    UserContext,
    UserProvider
}