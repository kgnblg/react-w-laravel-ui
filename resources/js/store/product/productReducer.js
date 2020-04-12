import {
    PRODUCTS_ACTION_BEGIN,
    PRODUCTS_ACTION_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
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
        case PRODUCTS_ACTION_BEGIN:
            return {
                ...state,
                loading: true,
            }

        case PRODUCTS_ACTION_FAILURE:
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

        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading     : false,
                error       : false,
                initialized : true,
                products    : [ ...state.products, action.payload.product],
            }

        default:
            return state
    }
}