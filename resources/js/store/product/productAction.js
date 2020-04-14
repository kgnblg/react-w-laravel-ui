import axios from 'axios'

export const PRODUCTS_ACTION_BEGIN   = 'PRODUCTS_ACTION_BEGIN'
export const PRODUCTS_ACTION_FAILURE = 'PRODUCTS_ACTION_FAILURE'

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS'
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'

export const productsActionBegin   = ()        => ({ type: PRODUCTS_ACTION_BEGIN   })
export const productsActionFailure = ()        => ({ type: PRODUCTS_ACTION_FAILURE })

export const fetchProductsSuccess = (payload) => ({ type: FETCH_PRODUCTS_SUCCESS, payload })
export const createProductSuccess = (payload) => ({ type: CREATE_PRODUCT_SUCCESS, payload })
export const updateProductSuccess = (payload) => ({ type: UPDATE_PRODUCT_SUCCESS, payload })
export const deleteProductSuccess = (payload) => ({ type: DELETE_PRODUCT_SUCCESS, payload })

export const fetchProducts = (token) => {
    return dispatch => {
        if (! token) {
            dispatch(productsActionFailure())
            return
        }
        dispatch(productsActionBegin())

        axios.get(
            'http://localhost:8000/api/product',
            {
                headers: { 'Authorization': `Bearer ${token}` },
            }
        )
        .then((res) => {
            dispatch(fetchProductsSuccess({
                products: res.data.data,
            }))
        })
        .catch(() => {
            dispatch(productsActionFailure())
        })
    }
}

export const createProduct = (product, token) => {
    return dispatch => {
        if (! token) {
            dispatch(productsActionFailure())
            return
        }

        dispatch(productsActionBegin())

        axios.post(
            'http://localhost:8000/api/product',
            {
                name        : product.name,
                description : product.description,
                price       : product.price,
            },
            {
                headers: { 'Authorization': `Bearer ${token}` },
            }
        )
        .then((res) => {
            dispatch(createProductSuccess({
                product: res.data.data
            }))
        })
        .catch(() => {
            dispatch(productsActionFailure())
        })
    }
}

export const updateProduct = (product, token) => {
    return dispatch => {
        if (! token) {
            dispatch(productsActionFailure())
            return
        }

        dispatch(productsActionBegin())

        axios.put(
            'http://localhost:8000/api/product/' + product.id,
            {
                name        : product.name,
                description : product.description,
                price       : product.price,
            },
            {
                headers: { 'Authorization': `Bearer ${token}` },
            }
        )
        .then((res) => {
            dispatch(updateProductSuccess({
                product: res.data.data
            }))
        })
        .catch(() => {
            dispatch(productsActionFailure())
        })
    }
}

export const deleteProduct = (product, token) => {
    return dispatch => {
        if (! token) {
            dispatch(productsActionFailure())
            return
        }

        dispatch(productsActionBegin())

        axios.delete(
            'http://localhost:8000/api/product/' + product.id,
            {
                headers: { 'Authorization': `Bearer ${token}` },
            }
        )
        .then(() => {
            dispatch(deleteProductSuccess({
                product: { id: product.id },
            }))
        })
        .catch(() => {
            dispatch(productsActionFailure())
        })
    }
}