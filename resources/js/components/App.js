import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { Provider } from "react-redux"
import { store } from '../store/store'

import Header    from './navbar/Header'
import Footer    from './footer/Footer'
import Login     from './login/login'
import Dashboard from './dashboard/dashboard'

// Product page
import ProductList from './products/productList'

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path='/'          component={Login}       />
                            <PrivateRoute exact path='/dashboard' component={Dashboard}   />
                            <PrivateRoute exact path='/products'  component={ProductList} />
                        </Switch>
                        <Footer />
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))