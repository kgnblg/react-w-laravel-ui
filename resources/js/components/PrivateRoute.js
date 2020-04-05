import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux' 

function PrivateRoute({ authenticated, ...rest }) {
    return authenticated
        ? ( <Route { ...rest } /> )
        : ( <Redirect to="/" />   )
}

const mapStateToProps = state => ({
    authenticated : state.user.authenticated,
});

export default connect(mapStateToProps)(withRouter(PrivateRoute));