import axios from 'axios'

export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'

export const fetchProductsBegin   = ()        => ({ type: FETCH_PRODUCTS_BEGIN   })
export const fetchProductsFailure = ()        => ({ type: FETCH_PRODUCTS_FAILURE })
export const fetchProductsSuccess = (payload) => ({ type: FETCH_PRODUCTS_SUCCESS, payload })

export const fetchProducts = (token) => {
    return dispatch => {
        if (! token) {
            dispatch(fetchProductsFailure)
            return
        }
        dispatch(fetchProductsBegin())

        axios.get(
            'http://localhost:8000/api/products',
            {
                headers: { 'Authorization': `Bearer ${token}` },
            }
        )
        .then((res) => {
            dispatch(fetchProductsSuccess({
                products: res.data,
            }))
        })
        .catch(() => {
            dispatch(fetchProductsFailure())
        })
    }
}