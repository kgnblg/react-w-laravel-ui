import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { authenticated, user } = this.props

        if (! authenticated) {
            return <Redirect to='/' />
        }

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-header">
                                Dashboard
                            </div>
                            <div className="card-body">
                                Larasix is an e-commerce application developed with React, Redux, Redux-Thunk and Laravel 6.
                            </div>
                        </div>
                    </div>    
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                Products
                            </div>
                            <div className="card-body">
                                <div align="center">
                                    <h1>0</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                Orders
                            </div>
                            <div className="card-body">
                                <div align="center">
                                    <h1>0</h1>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                Returns
                            </div>
                            <div className="card-body">
                                <div align="center">
                                    <h1>0</h1>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-header">
                                Total Endorsement
                            </div>
                            <div className="card-body">
                                <div align="center">
                                    <h1>0.00</h1>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user          : state.user.user,
    authenticated : state.user.authenticated,
    error         : state.user.error,
})

export default connect(mapStateToProps)(Dashboard)