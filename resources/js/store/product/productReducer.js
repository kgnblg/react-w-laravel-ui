import {
    PRODUCTS_ACTION_BEGIN,
    PRODUCTS_ACTION_FAILURE,
    FETCH_PRODUCTS_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
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

        case UPDATE_PRODUCT_SUCCESS:
        case DELETE_PRODUCT_SUCCESS:
            const product = state.products.findIndex((p) => p.id === action.payload.product.id)
            const new_state = {
                ...state,
                loading     : false,
                error       : (product === -1),
                initialized : true,
            }

            if (action.type === UPDATE_PRODUCT_SUCCESS) {
                new_state.products[product] = action.payload.product
            } else {
                new_state.products.splice(product, 1)
            }
            return new_state

        default:
            return state
    }
}