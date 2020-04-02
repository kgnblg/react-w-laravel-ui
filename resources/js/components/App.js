import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from '../store/store'

import Header    from './navbar/Header'
import Footer    from './footer/footer'
import Login     from './login/login'
import Dashboard from './dashboard/dashboard'

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path='/'          component={Login}     />
                            <Route exact path='/dashboard' component={Dashboard} />
                        </Switch>
                        <Footer />
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))