import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../store/product/productAction'
import LoadingSpinner from '../modules/Spinner/LoadingSpinner'

const productList = () => {
    const dispatch = useDispatch()
    const { product, token, loading } = useSelector(state => ({
        product : state.product,
        token   : state.user.user.token,
        loading : state.product.loading,
    }))

    // consoleDidMount
    useEffect(() => {
        dispatch(fetchProducts(token))
    }, [])

    return (
        <div>
            { loading && <LoadingSpinner /> }
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-header">
                                Products
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Product Name</th>
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
    </tr>
)

const renderList = (products) => {
    const list = products.map(
        (p) => (
            <tr key={p.id}>
                <th scope="row">{ p.id }</th>
                <td>{ p.name }</td>
                <td>-</td>
            </tr>
        )
    )

    return list
}

export default productList