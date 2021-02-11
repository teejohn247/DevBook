import React, {  Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import Navbar from './components/layout/Navbar';
// import Footer from './components/layout/Footer';
// import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

// import PrivateRoute from './components/routing/PrivateRoute';


// import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import './App.css';

// if(localStorage.token) {
// setAuthToken(localStorage.token)
// }
const App = () => {
useEffect (() => {
  store.dispatch(loadUser())
   }, [])
    return (
      <Provider store={store}>
        <Router>
          <div>
            {/* <Navbar /> */}
            <Route exact path="/" component={Register} />
            <div>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />

            {/* <Alert /> */}

              {/* <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} /> */}
              <Switch>
                {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
              </Switch>
              {/* <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch> */}
              {/* <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/posts"
                  component={Posts}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/posts/:id"
                  component={Post}
                />
              </Switch> */}
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </Provider>
    );
  }

export default App;