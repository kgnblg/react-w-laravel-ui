import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../store/product/productAction'
import LoadingSpinner from '../modules/Spinner/LoadingSpinner'
import { Link } from 'react-router-dom'

const productList = () => {
    const dispatch = useDispatch()
    const { product, token, loading, initialized } = useSelector(state => ({
        product : state.product,
        token   : state.user.user.token,
        loading : state.product.loading,
        initialized: state.product.initialized,
    }))

    // consoleDidMount
    useEffect(() => {
        if (! initialized) {
            dispatch(fetchProducts(token))
        }
    }, [])

    return (
        <div>
            { loading && <LoadingSpinner /> }
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    Products
                                    <Link
                                        className="btn btn-sm btn-light"
                                        to="/product/new"
                                    >
                                        <i className="fa fa-plus" /> New Product
                                    </Link>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            product.products.length === 0
                                                ? noRows()
                                                : renderList(product.products)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    )
}

const noRows = () => (
    <tr>
        <th scope="row">-</th>
        <td>No entry at the DB</td>
        <td>-</td>
        <td>-</td>
    </tr>
)

const renderList = (products) => {
    const list = products.map(
        (p) => (
            <tr key={p.id}>
                <th scope="row">{ p.id }</th>
                <td>{ p.name }</td>
                <td>{ p.price }</td>
                <td>
                    <Link
                        className="btn btn-sm btn-light"
                        to={'/product/' + p.id}
                    >
                        <i className="fa fa-file" />
                    </Link>
                </td>
            </tr>
        )
    )

    return list
}

export default productList