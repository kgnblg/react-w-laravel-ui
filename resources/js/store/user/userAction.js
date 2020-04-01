import axios from 'axios'

export const FETCH_USER_DATA_BEGIN   = 'FETCH_USER_BEGIN'
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_FAILURE'
// Auth
export const FETCH_USER_AUTH_BEGIN   = 'FETCH_USER_AUTH_BEGIN'
export const FETCH_USER_AUTH_SUCCESS = 'FETCH_USER_AUTH_SUCCESS'
export const FETCH_USER_AUTH_FAILURE = 'FETCH_USER_AUTH_FAILURE'

export const fetchUserDataBegin   = ()        => ({ type: FETCH_USER_DATA_BEGIN   })
export const fetchUserDataFailure = ()        => ({ type: FETCH_USER_DATA_FAILURE })
export const fetchUserDataSuccess = (payload) => ({ type: FETCH_USER_DATA_SUCCESS, payload })

export const userAuthBegin   = ()        => ({ type: FETCH_USER_AUTH_BEGIN   })
export const userAuthFailure = ()        => ({ type: FETCH_USER_AUTH_FAILURE })
export const userAuthSuccess = (payload) => ({ type: FETCH_USER_AUTH_SUCCESS, payload })

export const fetchUserData = (user = null) => {
    return dispatch => {
        if (user.token === null) {
            // if the user not authenticated
            dispatch(fetchUserDataFailure())
            return
        }
        // fetch user data
        dispatch(fetchUserDataBegin())
        return axios.get(
            'http://localhost:8000/api/user',
            {
                headers: { Authorization: `Bearer ${user.token}` },
            }
        )
        .then((res) => {
            dispatch(fetchUserDataSuccess({
                user: {
                    id       : res.data.id,
                    name     : res.data.name,
                    email    : res.data.email,
                    password : null,
                }
            }))
        })
        .catch(() => {
            dispatch(fetchUserDataFailure())
        })
    };
}

export const authenticateUser = (user) => {
    return dispatch => {
        if ((user.email === null || user.password === null)
            || (user.email === undefined || user.password === undefined)) {
            dispatch(userAuthFailure())
            return
        }

        dispatch(userAuthBegin())

        return axios.post(
            'http://localhost:8000/api/login',
            {
                email    : user.email,
                password : user.password,
            }
        )
        .then((res) => {
            dispatch(userAuthSuccess({
                user: {
                    token: (res && res.data.token ? res.data.token : null)
                }
            }))
        })
        .catch((a) => {
            dispatch(userAuthFailure())
        })
    }
}



