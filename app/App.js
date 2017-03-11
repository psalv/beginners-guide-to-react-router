import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Container}>

                    <IndexRoute path='/' component={Home} />
                    <Route path='/address' component={Address} />
                    <Route path='*' component={NotFound} />

                </Route>
            </Router>
        )
    }
}

const Home = () => (
    <h1>Hello from Home!</h1>
);

const Address = () => (
    <h1>We are on Bernard.</h1>
);

const NotFound = () => (
    <h1>404.. Because this page doesn't exist and you should feel bad for trying. </h1>
);

const Nav = () => (
    <div>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/address">Address</Link>
    </div>
);

// props.children allows any routes wrapped within this route to be rendered in this component.
// meaning that routes contained within this container will persist through page switches within this container
// I.E. creates another layer on top for routes.
const Container = (props) => (
    <div>
        <Nav/>
        {props.children}
    </div>
);

export default App
