import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import 'antd/dist/antd.css';

import LoginLayout from './layouts/LoginLayout';
import SignupLayout from './layouts/SignupLayout';
import Homepage from './pages/customer/Homepage';
import { ErrorHandler } from './components/ErrorHandler/ErrorHandler';

import * as actionCreators from './store/actions/index'

class App extends Component {
  state = {
    loginLoading: false
  };

  componentDidMount() {
    if (!this.props.user)
      return;

    const { expireTime } = this.props.user;
    if (!expireTime)
      return;
    if (new Date(expireTime) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const remainingMilliseconds = new Date(expireTime).getTime() - new Date().getTime();
    this.setAutoLogout(remainingMilliseconds);
  }

  loginHandler = (values) => {
    const { email, password } = values;
    this.setState({ loginLoading: true });
    this.props.onLogin({ email, password });
    this.setState({ loginLoading: false });
    this.setAutoLogout(this.props.user.expireTime);
  };

  signupHandler = (values) => {
    this.setState({ loginLoading: true });
    this.props.onCustomerSignup(values);
    this.setState({ loginLoading: false });
  }

  logoutHandler = () => {
    this.props.onLogout();
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => this.logoutHandler(), milliseconds);
  };

  render() {
    const { loginLoading } = this.state;
    const { error, isAuth, user } = this.props;

    let routes = (
      <Switch>
        <Route exact path='/login'
          render={props => (
            <LoginLayout
              onLogin={this.loginHandler}
              submitLoading={loginLoading}
            />
          )}
        />
        <Route exact path='/signup'
          render={props => (
            <SignupLayout
              onSignup={this.signupHandler}
              submitLoading={loginLoading}
            />
          )}
        />
        <Route path='/'
          render={props => (
            <Homepage />
          )}
        />
      </Switch>
    );

    if (isAuth)
      routes = (
        user.isAdmin ?
          <Switch>
            <Route path='/'
              render={() => (
                <Homepage
                  onLogout={this.logoutHandler}
                />
              )}
            />
            <Redirect from='*' to='/' />
          </Switch>
          :
          <Switch>
            <Route path='/'
              render={() => (
                <Homepage
                  onLogout={this.logoutHandler}
                />
              )}
            />
            <Redirect from='*' to='/' />
          </Switch>
      );
    return (
      <Fragment>
        <ErrorHandler error={error} />
        <Switch>
          {routes}
        </Switch>
      </Fragment>
    );
  }
};

const mapStateToProps = state => {
  const { isAuth, user } = state.auth;
  const { error } = state.error;
  return {
    isAuth,
    user,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdminSignup: (values) => dispatch(actionCreators.adminSignup(values)),
    onCustomerSignup: (values) => dispatch(actionCreators.customerSignup(values)),
    onLogin: (values) => dispatch(actionCreators.login(values)),
    onLogout: () => dispatch(actionCreators.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
