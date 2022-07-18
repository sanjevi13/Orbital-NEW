//each action returns an object containing type and payload
//when passed to dispatch function, the object guides reducer on how to update state
export const LoginStart = () => ({
    type:"LOGIN_START"
});

export const LoginSuccess = (user) => ({
    type:"LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = (error) => ({
    type:"LOGIN_FAILURE",
    payload:error
});

export const LogOut = () => ({
    type:"LOGOUT"
})

export const Follow = (userID) => ({
    type:"FOLLOW",
    payload: userID
})

export const Unfollow = (userID) => ({
    type:"UNFOLLOW",
    payload: userID
})

export const UpdateProfile = (newDetails) => ({
    type:"UPDATE_PROFILE",
    payload: newDetails
})
