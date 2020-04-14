import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchProducts, createProduct, updateProduct } from '../../store/product/productAction'
import { Form } from 'react-bootstrap'
import LoadingSpinner from '../modules/Spinner/LoadingSpinner'

const productForm = ({ match: { params } }) => {
    const dispatch = useDispatch()

    const [productName,   setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [localLoading, setLocalLoading] = useState(false)
    const [productDescription, setProductDescription] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const { product, token, loading, error, initialized } = useSelector(state => ({
        product     : state.product,
        token       : state.user.user.token,
        loading     : state.product.loading,
        error       : state.product.error,
        initialized : state.product.initialized,
    }))

    useEffect(() => {
        if (params.formType !== 'new') {
            // fetch the product for edit mode
            if (! initialized) {
                dispatch(fetchProducts(token))
            } else {
                const selectedProduct = product.products.find((p) => p.id === Number(params.formType))
                if (selectedProduct !== -1) {
                    setProductName(selectedProduct.name)
                    setProductPrice(selectedProduct.price)
                    setProductDescription(selectedProduct.description)
                }
            }
        }
    }, [params.formType])

    useEffect(() => {
        setLocalLoading(loading)
    }, [ loading ])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (params.formType === 'new') {
            dispatch(createProduct({
                name: productName,
                description: productDescription,
                price: productPrice,
            }, token))
        } else {
            dispatch(updateProduct({
                id: params.formType,
                name: productName,
                description: productDescription,
                price: productPrice,
            }, token))
        }
        setSubmitted(true)
    }

    if (! loading && ! error && submitted) {
        return <Redirect to='/products' />
    }

    return (
        <div>
            { localLoading && <LoadingSpinner /> }
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-header">
                                Product Form
                            </div>
                            <div className="card-body">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="product.Name">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control
                                            type="input"
                                            value={productName}
                                            onChange={(e) => { setProductName(e.target.value) }}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="product.Price">
                                        <Form.Label>Product Price</Form.Label>
                                        <Form.Control
                                            type="input"
                                            value={productPrice}
                                            onChange={(e) => { setProductPrice(e.target.value) }}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="prodct.Description">
                                        <Form.Label>Product Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            value={productDescription}
                                            rows="5"
                                            onChange={(e) => { setProductDescription(e.target.value) }}
                                            required
                                        />
                                    </Form.Group>
                                    <button
                                        className="btn btn-sm btn-success"
                                        type="submit"
                                    >
                                        <i className="fa fa-plus-square" /> Save
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default productForm