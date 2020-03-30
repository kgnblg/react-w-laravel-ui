import React from 'react'
import { connect } from "react-redux"

class Login extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    componentDidMount() {
        const { authenticated } = this.props
        
        if (authenticated) {
            // redirect
        }
    }

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control is-invalid"
                                                name="email"
                                                value=""
                                                required
                                                autoComplete="email"
                                                autoFocus
                                            />
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>Hata mesajı</strong>
                                                </span>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label for="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control is-invalid"
                                                name="password"
                                                required
                                                autoComplete="current-password"
                                            />
                                                <span className="invalid-feedback" role="alert">
                                                    <strong>hata</strong>
                                                </span>
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                        </div>
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
})

export default connect(mapStateToProps)(Login)