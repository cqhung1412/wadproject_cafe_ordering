import React, { Component } from 'react'
import { withRouter, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { Spin } from 'antd'

import * as actionCreators from '../../../store/actions/index'

class CheckoutSuccess extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.props.onMount();
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    const element = redirect ? <Redirect to='/orders' /> : <Spin />;
    return (
      <>
        {element}
      </>
    )
  }
}

const mapStateToProps = state => {
  return null;
};

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => dispatch(actionCreators.createOrder())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CheckoutSuccess));