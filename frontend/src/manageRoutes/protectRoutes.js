import { Navigate } from "react-router-dom"; 
import { useAuthStore } from "../store/store";

export const PreventAuthFlow = ({ children }) => {
    const user = useAuthStore.getState().user;
    if(user){
        return <Navigate to={'/dashboard'} replace={true}></Navigate>
    } else {
        return children
    }
}

export const SetStateProvider = ({ children }) => {
    const setLocalUser = useAuthStore(state => state.setUserFromLocalStorage)
        setLocalUser(JSON.parse(localStorage.getItem('user')))
    return children
}

export const ProtectRoute = ({ children }) => {
    const user = useAuthStore.getState().user;
    if(user?.role === 0 || !user){
        return <Navigate to={'/'} replace={true}>{children}</Navigate>
    } else {
        return children
    }
}