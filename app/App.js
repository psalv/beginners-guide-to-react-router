import React, { Component } from 'react'
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory, browserHistory } from 'react-router'

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>

                {/*
                Have a parent route that will contain 'static' information while it's can change.
                Think of the children as a different address leading off of the first address.
                */}
                <Route path='/' component={Container}>

                    <IndexRoute path='/' component={Home} />

                    {/*
                    So we can route within an already existing path by entering another level of nesting.
                    So in this case Address is the container with Component1 and Component2 being variable
                    paths off of address.
                    We set the default path as the IndexRoute component
                    */}
                    <Route path='/address' component={Address}>
                        <IndexRoute component={Component1}/>
                        <Route path='c2' component={Component2}/>
                        <Route path='query' component={Query}/>
                    </Route>

                    {/*
                    We can choose what the components within the route will be by declaring them in the route.
                    So we know that NamedComponents takes a prop with a name title and one with a name subtitle,
                    however these are not specified until we define the components for this route.
                    */}
                    <Route path="/namedComponent" component={NamedComponents}>
                        <IndexRoute components={{title: Title, subTitle: SubTitle}}/>
                    </Route>


                    <Route path="/about/:name" component={About}/>


                    <Route path='*' component={NotFound} />

                </Route>
            </Router>
        )
    }
}

const Home = () => (
        <h1>Hello from Home!</h1>

);

// We want to accomplish the same link structure as we did in Container; however, now we
// are using /address as our default address.
const Address = (props) => (
    <div>
        <br/>
        <Link to="/address">Component1</Link>&nbsp;
        <Link to="/address/c2">Component2</Link>
        <h1>We are on Bernard.</h1>
        {props.children}
    </div>
);

const NotFound = () => (
    <h1>404.. Because this page doesn't exist and you should feel bad for trying. </h1>
);

const Nav = () => (
    <div>
        {/*
        Links can determine when the linked route or a descendant of that route is active.
        If we want the link to be active only on exact link use IndexLink or set the  onlyActiveOnIndex prop.
        */}
        {/*<Link activeStyle={{color: '#53acff'}} to="/">Home</IndexLink>&nbsp;*/}
        {/*<Link onlyActiveOnIndex={{color: '#53acff'}} to="/">Home</IndexLink>&nbsp;*/}
        {/*<IndexLink activeStyle={{color: '#53acff'}} to="/">Home</IndexLink>&nbsp;*/}

        {/*
        Alternatively, we can use css styling and active class names to determine the styling of elements.
        */}
        <IndexLink activeClassName='active' to="/">Home</IndexLink>&nbsp;
        <IndexLink activeClassName='active' to="/address">Address</IndexLink>&nbsp;
        <IndexLink activeClassName='active' to="/nonex">Non Existent</IndexLink>&nbsp;
        <IndexLink activeClassName='active' to="/namedComponent">Named Components</IndexLink>&nbsp;
        <IndexLink activeClassName='active' to="/about">About</IndexLink>&nbsp;

        {/*
        In this way, we can send queries to our different classes to alter what they show just by our linking.
        */}
        <IndexLink activeClassName='active' to={{
            pathname: "/address/query",
            query: {message: 'Hello from Route Query'}
        }}>Route Query</IndexLink>&nbsp;

    </div>
);

const Component1 = () => (
    <h4>First component</h4>
);

const Component2 = () => (
    <h4>Second component</h4>
);

// props.children allows any routes wrapped within this route to be rendered in this component.
// Meaning that routes contained within this container will persist through page switches within this container
// I.E. creates another layer on top for routes.
const Container = (props) => (
    <div>
        <Nav/>
        {props.children}
    </div>
);


// The props will be passed as parameters in the route.
const NamedComponents = (props) => (
    <div>
        {props.title} <br/>
        {props.subTitle}
    </div>
);

// These next two components will serve as elements with which the named components above will be assigned.
const Title = () => (
    <h2>Title component.</h2>
);

const SubTitle = () => (
    <h3>SubTitle component.</h3>
);


// The name will be passed as a parameter in the url, and the information will then be pulled out of the router.
const About = (props) => (
    <div>
        <h2>The about page.</h2>
        {props.params.name && <h3>{props.params.name}</h3>}         {/* This will do a check if the param is there. */}
    </div>
);

//The query.message is a parameter being sent by our link to this component, which is named Query.
const Query = (props) => (
    <h2>{props.location.query.message}</h2>
);



export default App
