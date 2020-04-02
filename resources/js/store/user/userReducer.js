import {
    FETCH_USER_DATA_BEGIN,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_FAILURE,
    FETCH_USER_AUTH_BEGIN,
    FETCH_USER_AUTH_SUCCESS,
    FETCH_USER_AUTH_FAILURE,
} from './userAction'

const initialUserState = {
    user: {
        id       : null,
        name     : null,
        email    : null,
        password : null,
        token    : null,
    },
    error         : false,
    initialized   : false,
    loading       : false,
    authenticated : false,
}

export default function userReducer(state = initialUserState, action) {
    if(action.type === undefined || action.type === null) { return }

    switch(action.type) {
        case FETCH_USER_AUTH_BEGIN:
            return {
                ...state,
                loading : true,
                error   : false,
            }

        case FETCH_USER_AUTH_SUCCESS:
            return {
                ...state,
                loading       : false,
                error         : false,
                authenticated : true,
                user: {
                    token: action.payload.user.token,
                },
            }

        case FETCH_USER_AUTH_FAILURE:
            return {
                ...state,
                loading       : false,
                error         : false,
                authenticated : false,
            }

        case FETCH_USER_DATA_BEGIN:
            return {
                ...state,
                loading       : true,
                error         : false,
                initialized   : false,
            }

        case FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                loading       : false,
                error         : false,
                initialized   : true,
                user          : action.payload.user,
            }

        case FETCH_USER_DATA_FAILURE:
            return {
                ...state,
                loading       : false,
                error         : true,
                initialized   : false,
            }

        default:
            return state
    }
}