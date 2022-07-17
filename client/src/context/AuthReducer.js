//updates the state 
const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return{
                user: false,
                isFetching: false,
                error: action.payload
            };
        case "LOGOUT":
            return{
                user: null,
                isFetching: false,
                error: false,
            }
        case "FOLLOW":
            return{
                ...state, //means keep all the other components in the state (isFetching, error)
                user: {
                    ...state.user, //keep all other components apart from following in state.user
                    following: [...state.user.following, action.payload]
                }
            };

        case "UNFOLLOW":
            return{
                ...state,
                user: {
                    ...state.user,
                    following: state.user.following.filter(eachFollowing => eachFollowing !== action.payload)
                }
            };
        
        case "UPDATE_PROFILE": //updates state to include new profile details
            return {
                ...state, 
                user: {
                    ...state.user,
                    city: action.payload.city,
                    course: action.payload.course,
                    relationship: action.payload.status
                }
            }
        }
};

export default AuthReducer;