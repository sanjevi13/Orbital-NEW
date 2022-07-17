import { createContext, useReducer, useEffect } from "react";

import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    //if there is a user present in the localstorage, take data from there
    user: JSON.parse(localStorage.getItem("user")) || null, 
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => { //children here is what it wraps 
    //dispatch function sends data to given reducer
    //useReducer sets the state using our predefined INITIAL_STATE
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(()=>{ //place user state into localstorage
        localStorage.setItem("user", JSON.stringify(state.user))
      }, [state.user]) 

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