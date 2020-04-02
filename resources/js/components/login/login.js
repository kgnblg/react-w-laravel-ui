import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import { authenticateUser } from '../../store/user/userAction'

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email    : null,
            password : null,
            error    : {
                email    : null,
                password : null,
            },
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        if (event.target.name === 'email') {
            this.setState({ email: event.target.value })
        }

        if (event.target.name === 'password') {
            this.setState({ password: event.target.value })
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        this.validateInputs()
        if (this.state.error.email !== null
            || this.state.error.password !== null) {
            return
        }

        this.props.dispatch(
            authenticateUser({
                email    : this.state.email,
                password : this.state.password,
            })
        )
    }

    validateInputs() {
        // clear previous error logs
        this.setState({
            error: {
                email    : null,
                password : null,
            }
        })

        if (this.state.email === null || ! emailRegex.test(this.state.email)) {
            this.setState({ error: { email: 'Wrong email adress' } })
        }
        if (this.state.password === null) {
            this.setState({ error: { password: 'Please fill the password field' } })
        }
    }

    render() {
        const { authenticated } = this.props

        if (authenticated) {
            return <Redirect to='/dashboard' />
        }

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Login
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input
                                                id="email"
                                                type="email"
                                                className={"form-control " + (this.state.error.email !== null ? 'is-invalid' : '') }
                                                name="email"
                                                required
                                                autoComplete="email"
                                                autoFocus
                                                onChange={this.handleChange}
                                            />
                                            {
                                                this.state.error.email !== null &&
                                                    <span className="invalid-feedback" role="alert">
                                                        <strong>{ this.state.error.email }</strong>
                                                    </span>
                                            }
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                        <div className="col-md-6">
                                            <input
                                                id="password"
                                                type="password"
                                                className={"form-control " + (this.state.error.password !== null ? 'is-invalid' : '') }
                                                name="password"
                                                required
                                                autoComplete="current-password"
                                                onChange={this.handleChange}
                                            />
                                                {
                                                    this.state.error.password !== null &&
                                                        <span className="invalid-feedback" role="alert">
                                                            <strong>{ this.state.error.password }</strong>
                                                        </span>
                                                }
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
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

export default connect(mapStateToProps)(Login)