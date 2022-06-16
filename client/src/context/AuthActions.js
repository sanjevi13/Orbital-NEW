//tells reducer what to update
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