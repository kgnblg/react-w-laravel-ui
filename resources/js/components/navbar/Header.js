import React from 'react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { fetchUserData } from '../../store/user/userAction'

class Header extends React.Component {
    getUserData() {
        const { authenticated, user } = this.props
        if (authenticated && user.token !== null) {
            // if there is an error, do not try to refetch
            this.props.dispatch(fetchUserData(user))
        }
    }

    render() {
        const { authenticated, user } = this.props
        this.getUserData()
        return (
            <div className="mb-4">
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
                                            <a href="#">Dashboard</a>
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
                                                <a className="dropdown-item" href="">
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
});

export default connect(mapStateToProps)(withRouter(Header));