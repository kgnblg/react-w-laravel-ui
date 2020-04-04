import React from 'react'
import { connect } from "react-redux"
import { withRouter, Link } from 'react-router-dom'
import { fetchUserData } from '../../store/user/userAction'
import LoadingSpinner from '../modules/Spinner/LoadingSpinner'

class Header extends React.Component {
    componentDidMount()  { this.getUserData() }
    componentDidUpdate() { this.getUserData() }

    getUserData() {
        const { authenticated, user, initialized, error } = this.props

        if (authenticated && ! initialized && user.token !== null) {
            // if there is an error, do not try to refetch
            // basic error msg to user
            if (error) {
                window.alert('An error occured. Please try again.')
                return
            }

            this.props.dispatch(fetchUserData(user))
        }
    }

    render() {
        const { authenticated, user, loading } = this.props

        return (
            <div className="mb-4">
                { loading && <LoadingSpinner /> }
                <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                    <div className="container">
                        <a className="navbar-brand" href="">Larasix <sup>by kgnblg</sup></a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                {
                                    authenticated
                                        && (
                                            <div className="d-flex justify-content-center">
                                                <li>
                                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                                </li>
                                                <li>
                                                    <Link className="nav-link" to="/products">Products</Link>
                                                </li>
                                                <li>
                                                    <a className="nav-link" href="#">Orders</a>
                                                </li>
                                            </div>
                                        )
                                }
                            </ul>
                            { authenticated
                                && (
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item dropdown">
                                            <a
                                                id="navbarDropdown"
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                { user.name } - # { user.id } <span className="caret"></span>
                                            </a>
                                            <div
                                                className="dropdown-menu dropdown-menu-right"
                                                aria-labelledby="navbarDropdown"
                                            >
                                                <a className="dropdown-item" href="#">
                                                    Logout
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user          : state.user.user,
    authenticated : state.user.authenticated,
    initialized   : state.user.initialized,
    error         : state.user.error,
    loading       : state.user.loading,
});

export default connect(mapStateToProps)(withRouter(Header));