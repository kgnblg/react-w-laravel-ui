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
                    <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    Dashboard
                                </div>
                                <div className="card-body">
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