import { createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user : null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => { //children here is what it wraps 
    //dispatch function sends data to given reducer
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    return ( 
        <AuthContext.Provider value= {{ //this is the data available in the Context
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