import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
} from './productAction'

const initialState = {
    products      : [],
    error         : false,
    initialized   : false,
    loading       : false,
}

export default function productReducer(state = initialState, action) {
    if(action.type === undefined || action.type === null) { return }

    switch(action.type) {
        case FETCH_PRODUCTS_BEGIN:
            return {
                ...state,
                loading: true,
            }

        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error  : true,
            }

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading     : false,
                error       : false,
                initialized : true,
                products    : action.payload.products,
            }

        default:
            return state
    }
}