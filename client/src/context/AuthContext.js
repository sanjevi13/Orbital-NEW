import { createContext, useEffect, useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user : null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => { //children here is what it wraps 
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); //dispatch function sends data to reducer
    
    return ( 
        <AuthContext.Provider value= {{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}
        >
            {children}
        </AuthContext.Provider> 
    )
}